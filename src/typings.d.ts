/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}
interface JQuery {
  slickgrid: (options: any) => any;
}
