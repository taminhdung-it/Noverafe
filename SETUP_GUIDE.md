# StoryHub - Setup & Installation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation Steps

1. **Navigate to project directory**
```bash
cd my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

## 📖 Exploring the Platform

### Homepage
Visit `http://localhost:3000` to see:
- Hero banner with featured stories
- Trending novels and webtoons
- Genre spotlight
- New releases
- Stats section

### Novel Detail Page
- Click any novel card to view details
- Example: `/novels/novel-1`

### Comic Detail Page
- Click any comic card to view details
- Example: `/comics/comic-1`

### Reading Pages
- Novel reading: `/reading/novel/novel-1/1`
- Comic reading: `/reading/comic/comic-1/1`

### Creator Dashboard
- Visit `/dashboard` to explore creator tools
- Four tabs: Overview, Stories, Analytics, Upload

### User Profile
- Visit `/profile` to see author profile
- Shows works, followers, and favorites

## 🔨 Project Commands

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📁 Key Files to Customize

### Typography & Content
- `lib/mock-data.ts` - Update story data
- `types/index.ts` - Modify TypeScript interfaces

### Styling
- `app/globals.css` - Global styles and animations
- `tailwind.config.js` - Tailwind configuration

### Components
- `components/ui/` - Reusable UI components
- `components/layout/` - Header and Footer
- `components/home/` - Homepage-specific components

### Pages
- `app/page.tsx` - Homepage
- `app/novels/[id]/page.tsx` - Novel detail
- `app/comics/[id]/page.tsx` - Comic detail
- `app/reading/novel/[id]/[chapter]/page.tsx` - Novel reading
- `app/reading/comic/[id]/[chapter]/page.tsx` - Comic reading
- `app/dashboard/page.tsx` - Creator dashboard
- `app/profile/page.tsx` - User profile

## 🎨 Customization Guide

### Change Colors

1. **Update theme colors in `globals.css`:**
```css
:root {
  --primary-color: #8B5CF6; /* Purple */
  --accent-color: #EC4899;  /* Pink */
}
```

2. **Use Tailwind gradient:**
```jsx
<div className="bg-gradient-to-r from-purple-600 to-pink-600">
```

### Update Mock Data

Edit `lib/mock-data.ts`:

```typescript
export const mockNovels: Novel[] = [
  {
    id: 'novel-1',
    title: 'Your Novel Title',
    description: 'Your description here',
    cover: 'https://your-image-url.com/image.jpg',
    author: mockAuthors[0],
    // ... other properties
  },
];
```

### Modify Layouts

Edit component files in `components/` to:
- Change layout structure
- Update styling
- Add new sections
- Modify animations

### Add New Pages

1. Create new directory: `app/your-page/`
2. Create `page.tsx` file
3. Add your content

Example:
```typescript
export default function YourPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Your content */}
    </div>
  );
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Click Deploy
4. Done! 🎉

### Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_APP_NAME=StoryHub
```

## 📱 Testing Responsive Design

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Test different screen sizes

### Mobile View
- iPhone 12: 390px × 844px
- iPad: 768px × 1024px
- Desktop: 1920px × 1080px

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Missing Dependencies
```bash
npm install
npm run build
```

### TypeScript Errors
Check `tsconfig.json` and ensure types are correct:
```bash
npm run lint
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Lucide Icons](https://lucide.dev)

## 🎯 Next Steps

1. **Integrate Real API**
   - Replace mock data with actual API calls
   - Add fetch or axios

2. **Add Authentication**
   - Implement user login/signup
   - Add JWT tokens

3. **Database Setup**
   - Choose database (MongoDB, PostgreSQL, etc.)
   - Create schemas
   - Add ORM (Prisma, etc.)

4. **Payment Integration**
   - Add Stripe or PayPal
   - Implement payment flow

5. **Deploy to Production**
   - Set up CI/CD pipeline
   - Configure environment variables
   - Deploy to Vercel or your hosting

## 💡 Tips & Best Practices

### Performance
- Use `next/image` for images
- Implement lazy loading
- Optimize CSS and JavaScript
- Monitor Core Web Vitals

### Code Quality
- Write TypeScript for type safety
- Follow component naming conventions
- Keep components small and reusable
- Add prop validation

### SEO
- Add meta descriptions
- Use semantic HTML
- Create sitemap
- Add robots.txt
- Implement structured data

### Accessibility
- Use semantic HTML tags
- Add alt text to images
- Ensure color contrast
- Support keyboard navigation
- Test with screen readers

## 🚨 Security Notes

**This is a demo application with mock data. Before production:**

1. ✅ Implement proper authentication
2. ✅ Add input validation
3. ✅ Use environment variables for secrets
4. ✅ Set up HTTPS
5. ✅ Implement rate limiting
6. ✅ Add CORS configuration
7. ✅ Sanitize user input
8. ✅ Use security headers

## 📞 Support

For help:
1. Check documentation
2. Review code comments
3. Check browser console for errors
4. Review Next.js error messages

---

Happy coding! 🎉
