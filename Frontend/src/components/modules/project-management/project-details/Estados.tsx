import Badge from 'components/base/Badge';
import AvatarDropdown from 'components/common/AvatarDropdown';
import { members } from 'data/users';

const tags = [
  'Unused_brain',
  'Machine',
  'Coding',
  'Meseeks',
  'Smithpeople',
  'Rick',
  'Biology',
  'Neurology',
  'Brainlessness',
  'Stupidity',
  'Jerry',
  'Not _the_mouse'
];

const Estados = () => {
  return (
    <div>
      {/*       <h4 className="text-body-emphasis mb-4">Estados</h4>
       */}{' '}
      <div className="d-flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge variant="tag" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Estados;
