export const isEmptyString = (req: any, res: any, next: any) => {
  const isEmptyTitle = req.body.title === null || req.body.title === undefined;
  if (isEmptyTitle) {
    return res.status(401).json("Error in Title field");
  }
  next();
};
