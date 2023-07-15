export const MSG = {
  CPY_SUCCESS: ({ template, target }: { template: string; target: string }) =>
    console.log(`\n✅ is Success copied ${template} to ${target}\n`),

  CPY_FAIL: (e: unknown) => console.log(`\n❌ is Failed ==> ${e}\n`),
};
