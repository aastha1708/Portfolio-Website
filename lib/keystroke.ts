/**
 * The typing sound, synthesised rather than sampled.
 *
 * WHY NOT AN MP3
 * --------------
 * A recording of one keypress played 47 times in a row sounds exactly like a
 * recording of one keypress played 47 times in a row — the ear locks onto the
 * loop almost immediately, and it is the repetition that kills the ASMR of it.
 * Synthesising each stroke means every one is a little different (pitch, level,
 * the balance of click to body), which is what real typing actually sounds
 * like. It also ships zero bytes, needs no licence, and can be re-voiced by
 * changing two numbers.
 *
 * HOW A SWITCH IS PUT TOGETHER
 * ----------------------------
 * A good tactile switch is two sounds a few milliseconds apart:
 *   the CLICK  — the stem hitting the housing. Bright, very short, basically
 *                filtered noise around 2-3kHz.
 *   the THOCK  — the keycap bottoming out on the plate. Low, rounded, a damped
 *                sine an octave or two below middle C.
 * Deep boards get their character from a quiet click over a fat thock, so the
 * mix here leans on the body and keeps the click just present enough to read as
 * a keyboard rather than a drum.
 *
 * The space bar is a bigger piece of plastic over a stabiliser, so it gets a
 * lower body and a longer tail — the detail your ear notices without being
 * able to name it.
 */

type Kind = "key" | "space";

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export class Keystrokes {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;

  /** True once the browser has actually let the context start. */
  get running() {
    return this.ctx?.state === "running";
  }

  /**
   * Build the graph. Safe to call before any gesture: the context will simply
   * sit suspended until `unlock()` gets a chance to resume it.
   */
  private init() {
    if (this.ctx) return;
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();

    // A little headroom, and nothing below 110Hz — laptop speakers turn sub
    // content into a rattle rather than a thock.
    const master = ctx.createGain();
    master.gain.value = 0.5;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 110;
    master.connect(hp).connect(ctx.destination);

    // One second of white noise, reused for every click.
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    this.ctx = ctx;
    this.master = master;
    this.noise = buf;
  }

  /** Call from inside a user gesture. Resolves to whether sound is available. */
  async unlock(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;
    try {
      await this.ctx.resume();
    } catch {
      /* blocked — the loader just runs silent */
    }
    return this.running;
  }

  /** Attempt without a gesture; will be refused on a cold load, which is fine. */
  tryStart() {
    this.init();
    this.ctx?.resume().catch(() => {});
  }

  play(kind: Kind = "key") {
    if (!this.ctx || !this.master || !this.noise || !this.running) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const space = kind === "space";

    // ---- click: the stem, 15ms of bandpassed noise -----------------------
    const click = ctx.createBufferSource();
    click.buffer = this.noise;
    click.playbackRate.value = rand(0.9, 1.1);
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = rand(2100, 2900);
    band.Q.value = 1.1;
    const clickGain = ctx.createGain();
    const clickPeak = rand(0.05, 0.085) * (space ? 0.8 : 1);
    clickGain.gain.setValueAtTime(0.0001, t);
    clickGain.gain.exponentialRampToValueAtTime(clickPeak, t + 0.001);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);
    click.connect(band).connect(clickGain).connect(this.master);
    click.start(t);
    click.stop(t + 0.05);

    // ---- body: the keycap bottoming out ----------------------------------
    const body = ctx.createOscillator();
    body.type = "triangle";
    const f0 = space ? rand(88, 104) : rand(138, 166);
    body.frequency.setValueAtTime(f0, t);
    // A falling pitch over the first few ms is what makes it read as an
    // impact rather than as a note.
    body.frequency.exponentialRampToValueAtTime(f0 * 0.72, t + 0.05);

    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = rand(760, 1000);

    const bodyGain = ctx.createGain();
    const bodyPeak = rand(0.16, 0.24) * (space ? 1.15 : 1);
    const tail = space ? rand(0.13, 0.17) : rand(0.075, 0.105);
    bodyGain.gain.setValueAtTime(0.0001, t);
    bodyGain.gain.exponentialRampToValueAtTime(bodyPeak, t + 0.004);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + tail);

    body.connect(tone).connect(bodyGain).connect(this.master);
    body.start(t);
    body.stop(t + tail + 0.02);
  }

  close() {
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.master = null;
    this.noise = null;
  }
}
