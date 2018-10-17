
/* COUNT STAGED */

async function countStaged ( git ) {

  const status = await git.status ();

  return status.staged.length;

}

/* EXPORT */

export default countStaged;
