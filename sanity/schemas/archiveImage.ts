import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'archiveImage',
  title: 'Archive Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English Title' },
        { name: 'ar', type: 'string', title: 'Arabic Title' }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          type: 'text', 
          title: 'English Description',
          rows: 4
        },
        { 
          name: 'ar', 
          type: 'text', 
          title: 'Arabic Description',
          rows: 4
        }
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'date',
          title: 'Date',
          type: 'datetime'
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string'
        },
        {
          name: 'source',
          title: 'Source',
          type: 'string'
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string'
        },
        {
          name: 'copyright',
          title: 'Copyright',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'aiInsights',
      title: 'AI Generated Insights',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English Insights',
          type: 'text',
          rows: 5
        },
        {
          name: 'ar',
          title: 'Arabic Insights',
          type: 'text',
          rows: 5
        },
        {
          name: 'generatedAt',
          title: 'Generated At',
          type: 'datetime'
        }
      ]
    }),
    defineField({
      name: 'r2Url',
      title: 'R2 Storage URL',
      type: 'url',
      description: 'Cloudflare R2 storage URL for the image'
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'title.ar',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Date, Old',
      name: 'dateAsc',
      by: [{ field: '_createdAt', direction: 'asc' }]
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
});

