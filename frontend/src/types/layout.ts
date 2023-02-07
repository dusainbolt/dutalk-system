export type BreadcrumbsType = {
  href?: string;
  text?: string;
};

export type AppDialog = {
  open?: boolean;
  title?: string;
  description?: string;
  content?: any;
  callbackOk?: any;
  label?: string;
  require?: boolean;
};

export type LayoutSlice = {
  dialog?: AppDialog;
  isShowChatListMobile?: boolean;
};
