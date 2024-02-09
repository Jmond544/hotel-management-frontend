export default function TextInput({
  formik,
  id,
  placeholder,
  type,
  icon,
  nameLavel,
  pattern,
}) {
  const handleBlur = (fieldName) => () => {
    formik.setFieldTouched(fieldName, true); // Marcar el campo como tocado
  };
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id}> {nameLavel} </label>
      <div className="flex flex-row gap-2 items-center">
        {icon}
        <input
          id={id}
          name={id}
          type={type}
          onChange={formik.handleChange}
          value={formik.values[id]}
          onBlur={handleBlur(id)}
          placeholder={placeholder}
          className="outline-none border-b border-slate-900/20 focus:border-slate-900/80 dark:border-slate-300/20 w-full"
          pattern={pattern}
        />
      </div>
      {formik.errors[id] && formik.touched[id] ? (
        <div className="text-red-500 text-sm">* {formik.errors[id]}</div>
      ) : null}
    </div>
  );
}
