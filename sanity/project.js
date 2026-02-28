export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'string',
      description: 'Например: Commercial · 4 min',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    },
    {
      name: 'embedUrl',
      title: 'Video Embed URL',
      type: 'url',
      description: 'YouTube или Vimeo embed ссылка',
    },
    {
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Порядок на главной (1, 2, 3...)',
    },
  ],
}
