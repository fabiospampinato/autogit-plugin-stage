
/* IMPORT */

import chalk from 'chalk';
import * as simpleGit from 'simple-git/promise';
import countStaged from './count_staged';

/* STAGE */

const defaultOptions = {
  files: ['-A']
};

function factory ( customOptions?: Partial<typeof defaultOptions> ) {

  const options = Object.assign ( {}, defaultOptions, customOptions );

  return async function pull ( config, repoPath, ctx, task ) {

    if ( !options.files ) return task.skip ( 'You need to provide some files' );

    const git = simpleGit ( repoPath );

    task.title = `stage ${chalk.gray ( options.files.join ( ', ' ) )}`;

    const prevStaged = await countStaged ( git );

    task.output = 'Staging files...';

    if ( config.dry ) return task.skip ();

    git.silent ();

    await git.add ( options.files );

    const nowStaged = await countStaged ( git ),
          deltaStaged = nowStaged - prevStaged;

    task.output = prevStaged ? `Staged ${deltaStaged} more files, ${nowStaged} total` : `Staged ${nowStaged} files`;

  };

}

/* EXPORT */

export = Object.assign ( factory, { default: factory } );
