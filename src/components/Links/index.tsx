import { IconName } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LINKS } from '../../constants';

const Links = () => (
  <div className="links">
    {LINKS.map(link => (
      <a key={link.key} target="_target" href={link.url} className={`link link-${link.key}`} title={link.text}>
        {link.key === 'instagram' && (
          <svg width="0" height="0">
            <radialGradient id="svg-instagram" r="150%" cx="30%" cy="107%">
              <stop stopColor="#fdf497" offset="0" />
              <stop stopColor="#fdf497" offset="0.05" />
              <stop stopColor="#fd5949" offset="0.45" />
              <stop stopColor="#d6249f" offset="0.6" />
              <stop stopColor="#285AEB" offset="0.9" />
            </radialGradient>
          </svg>
        )}
          <FontAwesomeIcon icon={['fab', link.icon as IconName]} className={`link-${link.key}`} />
      </a>
    ))}
  </div>
);

export default Links;
