// FreshCart — Submit guard used by the checkout handler (Phase 5C.1).
// Lock engages on the first accepted submit. On success it stays engaged until
// navigation; on failure it is released so the customer can retry.

export function createSubmitGuard() {
  let locked = false;
  return {
    isLocked: () => locked,
    run(fn) {
      if (locked) return { skipped: true };
      locked = true;
      try {
        return { skipped: false, result: fn() };
      } catch (error) {
        locked = false;
        throw error;
      }
    },
    release() { locked = false; }
  };
}
