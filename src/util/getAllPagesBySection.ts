import {
  getAllPages,
  MarkdownPageMetadata,
  PageMetadata,
} from '../generate/mod.ts';
import { BlogPostProps } from '../pages/blog/_template.tsx';
import { CareerProps } from '../pages/career/_template.tsx';
import { ProjectProps } from '../pages/projects/_template.tsx';

export async function getAllPagesBySection() {
  const pages = await getAllPages();
  return groupPagesBySection(pages.reverse());
}

function groupPagesBySection(pages: PageMetadata[]): {
  blog: BlogPostProps[];
  career: CareerProps[];
  projects: ProjectProps[];
  experiments: MarkdownPageMetadata[];
  talks: MarkdownPageMetadata[];
} {
  const sections: Record<string, PageMetadata[]> = {};
  const pinned = pages.filter((x) => x.pinned);
  const unpinned = pages.filter((x) => !x.pinned);

  for (const page of [...pinned, ...unpinned]) {
    const [, section] = `${page.path}`.split('/');

    if (page.file.endsWith('index.tsx')) {
      continue;
    }

    if (!sections[section]) sections[section] = [page];
    else sections[section].push(page);
  }

  // deno-lint-ignore no-explicit-any
  return sections as any;
}
