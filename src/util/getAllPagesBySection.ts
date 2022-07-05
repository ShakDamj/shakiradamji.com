import { getAllPages } from '../generate/mod.ts';
import { groupPagesBySection } from './groupPagesBySection.ts';

export async function getAllPagesBySection() {
  const pages = await getAllPages();
  return groupPagesBySection(pages.reverse());
}
