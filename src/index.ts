
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

  return async function stage ( config, repoPath, ctx, task ) {

    if ( !options.files ) return task.skip ( 'You need to provide some files' );

    const git = simpleGit ( repoPath );

    task.title = `stage ${chalk.gray ( options.files.join ( ', ' ) )}`;

    const prevStaged = await countStaged ( git );

    task.output = 'Staging files...';

    if ( config.dry ) return task.skip ();

    git.silent ();

    for ( let file of options.files ) {

      try {

        await git.add ([ file ]);

      } catch ( e ) {}

    }

    const nowStaged = await countStaged ( git ),
          deltaStaged = nowStaged - prevStaged;

    task.output = prevStaged ? `Staged ${deltaStaged} more ${deltaStaged === 1 ? 'file' : 'files'}, ${nowStaged} total` : `Staged ${nowStaged} ${nowStaged === 1 ? 'file' : 'files'}`;

  };

}

/* EXPORT */

export default factory;
