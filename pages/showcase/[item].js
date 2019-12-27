import { mapping } from '../../showcase-manifest';
import Showcase from './index';

export async function unstable_getStaticPaths() {
  return Object.keys(mapping).map(key => {
    return { params: { item: key } };
  });
}

export async function unstable_getStaticProps({ params }) {
  return {
    props: {
      item: params.item
    },
    revalidate: false
  };
}

export default props => <Showcase {...props} />;
