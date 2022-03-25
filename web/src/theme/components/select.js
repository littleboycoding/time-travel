const Select = {
  variants: {
    outline: (props) => ({
      icon: {
        color: props.colorScheme + ".500",
      },
      field: {
        borderColor: props.colorScheme + ".500",
        borderWidth: 2,
      },
    }),
  },
};

export default Select;
