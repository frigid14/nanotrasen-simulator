function createAudio(path: string) {
    return typeof Audio !== "undefined" && new Audio(path);
}

export const welcome = createAudio("assets/audio/sound_ai_default_welcome.ogg");
export const shuttleCall = createAudio("assets/audio/sound_ai_default_shuttlecalled.ogg");
export const shuttleRecall = createAudio("assets/audio/sound_ai_default_shuttlerecalled.ogg");
export const shuttleDock = createAudio("assets/audio/sound_ai_default_shuttledock.ogg");
export const intercept = createAudio("assets/audio/sound_ai_default_intercept.ogg");
export const spanomalies = createAudio("assets/audio/sound_ai_default_spanomalies.ogg");
export const attention = createAudio("assets/audio/sound_ai_default_attention.ogg");
export const meteors = createAudio("assets/audio/sound_ai_default_meteors.ogg");

export const cultist = createAudio("assets/audio/sound_ambience_antag_bloodcult.ogg");
export const malfai = createAudio("assets/audio/sound_ambience_antag_malf.ogg");
export const operatives = createAudio("assets/audio/sound_ambience_antag_ops.ogg");
export const wizards = createAudio("assets/audio/sound_ambience_antag_ragesmages.ogg");

export const explosion = createAudio("assets/audio/sound_effects_explosion1.ogg");