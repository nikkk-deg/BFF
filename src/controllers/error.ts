export const handlerError = (res: any, err: any) => {
  res.status(500).json(err);
};
