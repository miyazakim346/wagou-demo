export type CmsImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type CmsCategory = {
  id: string;
  name: string;
};

export type CmsPostListItem = {
  id: string;
  title: string;
  publishedAt: string;
  eyecatch?: CmsImage;
  category?: CmsCategory[];
};

export type CmsPostDetail = CmsPostListItem & {
  contents?: string;
};
