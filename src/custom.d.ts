//表示以es module的方式import *.css文件的时候遵循以下约定:
//将会导出key所在的对象，而原始的类名和相应的值都会转化为这个对象
declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}
