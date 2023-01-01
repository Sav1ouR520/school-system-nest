export const fromEnvGetValue = (key: string) => {
  const { env } = process;
  const value = env[key];
  if (!value) {
    throw new Error(`config error - missing env.${key}`);
  }
  return value;
};
