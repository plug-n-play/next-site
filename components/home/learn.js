import Container from '../container';
import Button from '../button';
import SectionHeader from '../section-header';
import Image from '../image';
import Link from 'next/link';

export default function Learn() {
  return (
    <Container center padding role="region" aria-labelledby="learn">
      <SectionHeader
        margin="0 0 2rem 0"
        id="learn"
        title="Learn Next.js"
        description="Tutorials, examples and quizzes. Learn Next.js step-by-step and earn points ✨."
      />
      <Link href="/learn/basics/getting-started">
        <a title="Get started learning Next.js">
          <Image
            alt="Learn page overview"
            margin={0}
            oversize={false}
            src="/static/images/learn.png"
            width={2110 / 2}
            height={1240 / 2}
          />
        </a>
      </Link>
      <div>
        <Button href="/learn/basics/getting-started" invert>
          Get Started
        </Button>
      </div>
    </Container>
  );
}
