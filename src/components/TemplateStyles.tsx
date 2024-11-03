export const getTemplateStyles = (template) => {
  const baseStyles = {
    campusChronicles: {
      redline:
        "absolute w-[4px] h-[160px] left-[25px] bg-[#F44F50] rounded-md bottom-[50px]",
      heading:
        "absolute font-poppins text-3xl font-semibold text-white left-[40px] w-[95%] leading-tight transition-all",
      text: "absolute text-left font-poppins font-regular text-lg text-white left-[40px] w-[90%] transition-all",
      innerText: "bg-[#F44F50] leading-relaxed py-0",
      overlay: "absolute inset-0 bg-black bg-opacity-60",
      innerPage:
        "absolute font-poppins text-lg font-bold text-[#F44F50] right-[30px] leading-tight transition-all bottom-[25px]",
    },
  };

  return baseStyles[template] || baseStyles.campusChronicles;
};
