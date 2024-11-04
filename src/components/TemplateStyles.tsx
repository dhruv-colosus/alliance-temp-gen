type TemplateName = string;

interface TemplateStyles {
  redline?: string;
  heading: string;
  text: string;
  innerText: string;
  overlay: string;
  innerPage?: string;
}

export const getTemplateStyles = (template: TemplateName): TemplateStyles => {
  const baseStyles: Record<TemplateName, TemplateStyles> = {
    campusChronicles: {
      redline:
        "absolute w-[4px] h-[160px] left-[25px] bg-[#F44F50] rounded-md bottom-[50px]",
      heading:
        "absolute font-gotham text-3xl font-black text-white left-[40px] w-[95%] leading-tight transition-all",
      text: "absolute text-left font-gotham font-normal text-xl text-white left-[40px] w-[90%] transition-all",
      innerText: "bg-[#F44F50] leading-[0.5rem]",
      overlay: "absolute inset-0 bg-black bg-opacity-60",
      innerPage:
        "absolute font-gotham text-lg font-bold text-[#F44F50] right-[30px] transition-all bottom-[25px]",
    },
  };

  return baseStyles[template] || baseStyles.campusChronicles;
};
