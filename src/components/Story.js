import classes from '../styles/Story.module.css';

export default function Story() {
  return (
    <a href="story.html">
      <div className={classes.story}>
        <h2 className={classes.title}>Just Another Title</h2>
        <p className={classes.description}>
          Just Another Description: aslkdgfasj dlkgjlk sdajgkjasdlkgjaslk djgkl sjdlkgj dsasgdjk asldkgjalksdjglkjas
          dklgjlkasdjglkj asdlkgj lkasdjg lkjasdlk dgjaslkdj glkjsadlkgj slkadjg Dummy Description 1 aslkdgfasj dlkgjlk
          sdajgkjasdlkgjaslk djgkl sjdlkgj dsasgdjk asldkgjalksdjglkjas dklgjlkasdjglkj asdlkgj lkasdjg lkjasdlk
          dgjaslkdj glkjsadlkgj slkadjg Dummy Description 1 aslkdgfasj dlkgjlk sdajgkjasdlkgjaslk djgkl sjdlkgj dsasgdjk
          asldkgjalksdjglkjas dklgjlkasdjglkj asdlkgj lkasdjg lkjasdlk dgjaslkdj glkjsadlkgj slkadjg Dummy Description 1
          aslkdgfasj dlkgjlk sdajgkjasdlkgjaslk djgkl sjdlkgj dsasgdjk asldkgjalksdjglkjas dklgjlkasdjglkj asdlkgj
          lkasdjg lkjasdlk dgjaslkdj glkjsadlkgj slkadjg Dummy Description 1 aslkdgfasj dlkgjlk sdajgkjasdlkgjaslk djgkl
          sjdlkgj dsasgdjk asldkgjalksdjglkjas dklgjlkasdjglkj asdlkgj lkasdjg lkjasdlk dgjaslkdj glkjsadlkgj slkadjg{' '}
          Dummy Description 1 aslkdgfasj dlkgjlk sdajgkjasdlkgjaslk djgkl sjdlkgj dsasgdjk asldkgjalksdjglkjas
          dklgjlkasdjglkj asdlkgj lkasdjg lkjasdlk dgjaslkdj glkjsadlkgj slkadjg{' '}
        </p>
        <p className={classes.author}>Author: Just Another Author</p>
        <p className={classes.continueReading}>CLICK TO CONTINUE READING...</p>
        <div className={classes.qmeta}>
          <p className={classes.createdAt}>Created: 23 May, 2022</p>
          <p className={classes.updatedAt}>Last Updated: 23 May, 2022</p>
        </div>
      </div>
    </a>
  );
}
