import classes from '../styles/Stories.module.css';
import Story from './Story';

export default function Stories() {
  return (
    <div className={classes.stories}>
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
}
