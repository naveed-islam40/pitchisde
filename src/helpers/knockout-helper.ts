export function shouldShowKnockoutPage(stages) {
  const knockoutStageNames = ["round of 16", "quarter", "semi", "final"];

  const hasKnockoutStage = stages?.some(stage => {
    const name = stage.name?.toLowerCase() || "";
    const isKnockout = knockoutStageNames.some(kn => name.includes(kn));
    return isKnockout && (stage.finished || stage.is_current);
  });


  return hasKnockoutStage;
}
