function Tab(props) {
  const handleClick = (e) => {
    props.onTabClick(props._id);
  };

  const baseClasses =
    "px-2 sm:px-3 py-1 sm:py-2 rounded-full border transition-all duration-200 font-medium text-sm sm:text-base backdrop-blur-md whitespace-nowrap flex-shrink-0";

  if (props._id === props.selectedCategoryId) {
    return (
      <button
        className={
          baseClasses +
          " bg-white text-gray-900 border-white shadow-md font-bold"
        }
      >
        {props.name}
      </button>
    );
  }

  return (
    <button
      className={
        baseClasses +
        " bg-white/10 text-white border-white/50 hover:bg-white/30 hover:text-gray-900"
      }
      onClick={handleClick}
    >
      {props.name}
    </button>
  );
}

export default Tab;
