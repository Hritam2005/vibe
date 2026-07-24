import {screeningConfig} from '#root/config/screening.js';
import {ScreeningLlm} from './ScreeningLlm.js';
import {GroqScreeningLlm} from './GroqScreeningLlm.js';
import {MinimaxScreeningLlm} from './MinimaxScreeningLlm.js';

/** Pick the screening LLM implementation from config (demo: groq, prod: minimax). */
export function createScreeningLlm(): ScreeningLlm {
  return screeningConfig.provider === 'minimax'
    ? new MinimaxScreeningLlm()
    : new GroqScreeningLlm();
}
