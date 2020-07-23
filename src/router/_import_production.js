const fileExport = (file) => () => import("@/views/" + file + ".vue");

export default fileExport