'use client';
import React, { useState, useMemo } from 'react';
import { Search, Filter, X, ExternalLink, DollarSign, CheckCircle, XCircle, Tag, Sparkles, Loader2, GitCompare, Trash2, Zap, TrendingUp, Award } from 'lucide-react';

// Mock data - replace with your actual data
const toolsData = {
  categories: [
    { id: 'productivity', name: 'Productivity' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'analytics', name: 'Analytics' }
  ],
  tools: [
    {
      id: 1,
      name: 'Notion',
      shortDescription: 'All-in-one workspace for notes, tasks, wikis, and databases',
      category: 'productivity',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Personal use' },
          { name: 'Plus', price: '$10/mo', details: 'Small teams' },
          { name: 'Business', price: '$18/mo', details: 'Growing teams' },
          { name: 'Enterprise', price: 'Custom', details: 'Large organizations' }
        ]
      },
      features: [
        'Collaborative workspace',
        'Database management',
        'Task tracking',
        'Wiki and documentation',
        'Templates library'
      ],
      pros: [
        'Highly customizable',
        'Great for team collaboration',
        'Powerful database features'
      ],
      cons: [
        'Steep learning curve',
        'Can be slow with large databases'
      ],
      tags: ['productivity', 'collaboration', 'notes', 'database'],
      affiliateLink: 'https://notion.so',
      featured: true
    },
    {
      id: 2,
      name: 'Figma',
      shortDescription: 'Collaborative interface design tool',
      category: 'design',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Personal use' },
          { name: 'Professional', price: '$12/mo', details: 'Per editor' },
          { name: 'Organization', price: '$45/mo', details: 'Per editor' }
        ]
      },
      features: [
        'Real-time collaboration',
        'Vector graphics editing',
        'Prototyping tools',
        'Component libraries',
        'Design systems'
      ],
      pros: [
        'Browser-based',
        'Excellent collaboration',
        'Large community'
      ],
      cons: [
        'Requires internet connection',
        'Limited offline features'
      ],
      tags: ['design', 'ui', 'ux', 'prototyping', 'collaboration'],
      affiliateLink: 'https://figma.com',
      featured: true
    },
    {
      id: 3,
      name: 'VS Code',
      shortDescription: 'Powerful code editor with extensive extensions',
      category: 'development',
      pricing: {
        model: 'Free',
        tiers: [
          { name: 'Free', price: '$0', details: 'Forever free' }
        ]
      },
      features: [
        'IntelliSense code completion',
        'Debugging support',
        'Git integration',
        'Extensions marketplace',
        'Multi-language support'
      ],
      pros: [
        'Completely free',
        'Huge extension library',
        'Fast and lightweight'
      ],
      cons: [
        'Can be resource-heavy with many extensions',
        'Setup required for some languages'
      ],
      tags: ['development', 'code editor', 'programming', 'ide'],
      affiliateLink: 'https://code.visualstudio.com'
    },
    {
      id: 4,
      name: 'Mailchimp',
      shortDescription: 'Email marketing platform for growing businesses',
      category: 'marketing',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Up to 500 contacts' },
          { name: 'Essentials', price: '$13/mo', details: 'Up to 50k contacts' },
          { name: 'Standard', price: '$20/mo', details: 'Up to 100k contacts' }
        ]
      },
      features: [
        'Email campaigns',
        'Marketing automation',
        'Audience segmentation',
        'A/B testing',
        'Analytics and reporting'
      ],
      pros: [
        'User-friendly interface',
        'Good free tier',
        'Comprehensive features'
      ],
      cons: [
        'Expensive for large lists',
        'Limited design flexibility'
      ],
      tags: ['marketing', 'email', 'automation', 'campaigns'],
      affiliateLink: 'https://mailchimp.com',
      featured: true
    },
    {
      id: 5,
      name: 'Google Analytics',
      shortDescription: 'Web analytics service for tracking website traffic',
      category: 'analytics',
      pricing: {
        model: 'Free',
        tiers: [
          { name: 'Free', price: '$0', details: 'Standard features' },
          { name: 'Analytics 360', price: '$150k/year', details: 'Enterprise' }
        ]
      },
      features: [
        'Real-time data',
        'Audience insights',
        'Conversion tracking',
        'Custom reports',
        'Integration with Google Ads'
      ],
      pros: [
        'Industry standard',
        'Free for most users',
        'Powerful insights'
      ],
      cons: [
        'Complex interface',
        'Privacy concerns',
        'Data sampling on free tier'
      ],
      tags: ['analytics', 'tracking', 'metrics', 'data'],
      affiliateLink: 'https://analytics.google.com'
    },
    {
      id: 6,
      name: 'Trello',
      shortDescription: 'Visual project management with boards, lists, and cards',
      category: 'productivity',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Up to 10 boards' },
          { name: 'Standard', price: '$5/mo', details: 'Unlimited boards' },
          { name: 'Premium', price: '$10/mo', details: 'Advanced features' },
          { name: 'Enterprise', price: '$17.50/mo', details: 'Organization-wide' }
        ]
      },
      features: [
        'Kanban boards',
        'Card-based workflow',
        'Power-ups and integrations',
        'Team collaboration',
        'Mobile apps'
      ],
      pros: [
        'Simple and intuitive',
        'Great for agile teams',
        'Extensive integrations'
      ],
      cons: [
        'Limited reporting features',
        'Can get cluttered with many cards'
      ],
      tags: ['productivity', 'project management', 'kanban', 'collaboration'],
      affiliateLink: 'https://trello.com'
    },
    {
      id: 7,
      name: 'Adobe XD',
      shortDescription: 'Design and prototype user experiences for web and mobile',
      category: 'design',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Basic features' },
          { name: 'Single App', price: '$9.99/mo', details: 'XD only' },
          { name: 'All Apps', price: '$54.99/mo', details: 'Full Creative Cloud' }
        ]
      },
      features: [
        'Design and wireframing',
        'Interactive prototypes',
        'Auto-animate',
        'Voice prototyping',
        'Shared design systems'
      ],
      pros: [
        'Adobe ecosystem integration',
        'Powerful prototyping',
        'Good performance'
      ],
      cons: [
        'Less community than Figma',
        'Requires Adobe account'
      ],
      tags: ['design', 'prototyping', 'ui', 'ux', 'adobe'],
      affiliateLink: 'https://adobe.com/xd',
      featured: true
    },
    {
      id: 8,
      name: 'GitHub',
      shortDescription: 'Version control and collaboration platform for developers',
      category: 'development',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Unlimited public repos' },
          { name: 'Team', price: '$4/user/mo', details: 'Advanced collaboration' },
          { name: 'Enterprise', price: '$21/user/mo', details: 'Enterprise features' }
        ]
      },
      features: [
        'Git repository hosting',
        'Pull requests and code review',
        'GitHub Actions CI/CD',
        'Issue tracking',
        'Project boards'
      ],
      pros: [
        'Industry standard for code hosting',
        'Excellent collaboration tools',
        'Large developer community'
      ],
      cons: [
        'Can be complex for beginners',
        'Private repos limited on free tier'
      ],
      tags: ['development', 'version control', 'git', 'collaboration', 'open source'],
      affiliateLink: 'https://github.com',
      featured: true
    },
    {
      id: 9,
      name: 'Canva',
      shortDescription: 'Easy graphic design tool for social media and marketing',
      category: 'design',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Basic features' },
          { name: 'Pro', price: '$12.99/mo', details: 'Premium content' },
          { name: 'Teams', price: '$14.99/user/mo', details: 'Team collaboration' }
        ]
      },
      features: [
        'Drag-and-drop editor',
        'Thousands of templates',
        'Brand kit',
        'Photo editing',
        'Team collaboration'
      ],
      pros: [
        'Very user-friendly',
        'Huge template library',
        'No design experience needed'
      ],
      cons: [
        'Less powerful than professional tools',
        'Limited customization options'
      ],
      tags: ['design', 'graphics', 'social media', 'templates', 'marketing'],
      affiliateLink: 'https://canva.com'
    },
    {
      id: 10,
      name: 'HubSpot',
      shortDescription: 'Complete CRM platform for marketing, sales, and service',
      category: 'marketing',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Basic CRM' },
          { name: 'Starter', price: '$45/mo', details: 'Marketing tools' },
          { name: 'Professional', price: '$800/mo', details: 'Advanced features' },
          { name: 'Enterprise', price: '$3,600/mo', details: 'Full suite' }
        ]
      },
      features: [
        'CRM and contact management',
        'Email marketing',
        'Marketing automation',
        'Sales pipeline',
        'Customer service tools'
      ],
      pros: [
        'All-in-one platform',
        'Excellent free CRM',
        'Great educational resources'
      ],
      cons: [
        'Expensive at higher tiers',
        'Can be overwhelming for small businesses'
      ],
      tags: ['marketing', 'crm', 'sales', 'automation', 'email'],
      affiliateLink: 'https://hubspot.com'
    },
    {
      id: 11,
      name: 'Slack',
      shortDescription: 'Business communication platform for team messaging',
      category: 'productivity',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Limited message history' },
          { name: 'Pro', price: '$7.25/user/mo', details: 'Unlimited history' },
          { name: 'Business+', price: '$12.50/user/mo', details: 'Advanced features' },
          { name: 'Enterprise Grid', price: 'Custom', details: 'Large organizations' }
        ]
      },
      features: [
        'Channel-based messaging',
        'Direct messages',
        'File sharing',
        'App integrations',
        'Video and voice calls'
      ],
      pros: [
        'Great for team communication',
        'Thousands of integrations',
        'User-friendly interface'
      ],
      cons: [
        'Can be distracting',
        'Search limited on free tier'
      ],
      tags: ['productivity', 'communication', 'team chat', 'collaboration'],
      affiliateLink: 'https://slack.com'
    },
    {
      id: 12,
      name: 'Postman',
      shortDescription: 'API platform for building and testing APIs',
      category: 'development',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Personal use' },
          { name: 'Basic', price: '$12/user/mo', details: 'Small teams' },
          { name: 'Professional', price: '$29/user/mo', details: 'Growing teams' },
          { name: 'Enterprise', price: 'Custom', details: 'Large organizations' }
        ]
      },
      features: [
        'API testing',
        'Request building',
        'Collections and documentation',
        'Mock servers',
        'Automated testing'
      ],
      pros: [
        'Industry standard for API testing',
        'Comprehensive features',
        'Good documentation'
      ],
      cons: [
        'Can be complex for beginners',
        'Desktop app required for full features'
      ],
      tags: ['development', 'api', 'testing', 'debugging'],
      affiliateLink: 'https://postman.com'
    },
    {
      id: 13,
      name: 'Mixpanel',
      shortDescription: 'Product analytics platform for understanding user behavior',
      category: 'analytics',
      pricing: {
        model: 'Freemium',
        tiers: [
          { name: 'Free', price: '$0/mo', details: 'Up to 20M events' },
          { name: 'Growth', price: '$25/mo', details: 'Up to 100M events' },
          { name: 'Enterprise', price: 'Custom', details: 'Unlimited events' }
        ]
      },
      features: [
        'Event tracking',
        'Funnel analysis',
        'Retention reports',
        'A/B testing',
        'User segmentation'
      ],
      pros: [
        'Powerful product analytics',
        'Real-time data',
        'Good visualizations'
      ],
      cons: [
        'Expensive for high-volume apps',
        'Learning curve for advanced features'
      ],
      tags: ['analytics', 'product analytics', 'tracking', 'user behavior'],
      affiliateLink: 'https://mixpanel.com'
    }
  ]
};

export default function ToolFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [showAIMode, setShowAIMode] = useState(false);
  const [compareTools, setCompareTools] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredTools = useMemo(() => {
    if (aiRecommendations && aiRecommendations.length > 0) {
      return aiRecommendations;
    }

    return toolsData.tools.filter(tool => {
      const matchesSearch = searchQuery === '' || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, aiRecommendations]);

  const handleAIRecommendation = async () => {
    if (!aiQuery.trim()) return;
    setIsLoadingAI(true);
    setAiRecommendations(null);
    
    try {
      const response = await fetch('/api/recommand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setAiRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      alert('Failed to get recommendations. Please try again.');
      // Fallback to showing first 3 tools
      setAiRecommendations(toolsData.tools.slice(0, 3));
    } finally {
      setIsLoadingAI(false);
    }
  };

  const clearAIRecommendations = () => {
    setAiRecommendations(null);
    setAiQuery('');
    setShowAIMode(false);
  };

  const toggleCompare = (tool) => {
    setCompareTools(prev => {
      const exists = prev.find(t => t.id === tool.id);
      if (exists) {
        return prev.filter(t => t.id !== tool.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 tools at a time');
          return prev;
        }
        return [...prev, tool];
      }
    });
  };

  const isInCompare = (toolId) => compareTools.some(t => t.id === toolId);

  const clearComparison = () => {
    setCompareTools([]);
    setShowComparison(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Tool Finder
                </h1>
                <p className="text-gray-600 mt-1 font-medium">Discover the perfect tools for your workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl border border-purple-200">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {filteredTools.length}
                </span>
                <span className="text-sm text-gray-600 ml-2">tools</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-8 pb-32">
        {/* AI Mode Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-2xl border-2 border-gray-200 bg-white p-1.5 shadow-lg">
            <button
              onClick={() => {
                setShowAIMode(false);
                clearAIRecommendations();
              }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                !showAIMode
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Search className="w-5 h-5" />
              Browse Tools
            </button>
            <button
              onClick={() => setShowAIMode(true)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                showAIMode
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              AI Magic
            </button>
          </div>
        </div>

        {/* AI Recommendation Mode */}
        {showAIMode ? (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-3xl"></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-white">AI-Powered Recommendations</h2>
                </div>
                <p className="text-white/90 mb-6 text-lg">
                  Tell me what you need, and I'll find the perfect tools for you ✨
                </p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="e.g., 'I need to manage my team's tasks' or 'Send newsletters to customers'"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAIRecommendation()}
                    className="flex-1 px-6 py-4 border-2 border-white/30 rounded-2xl focus:ring-4 focus:ring-white/50 focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder-white/60 font-medium text-lg"
                    disabled={isLoadingAI}
                  />
                  <button
                    onClick={handleAIRecommendation}
                    disabled={isLoadingAI || !aiQuery.trim()}
                    className="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3 text-lg"
                  >
                    {isLoadingAI ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Find Tools
                      </>
                    )}
                  </button>
                </div>

                {aiRecommendations && aiRecommendations.length > 0 && (
                  <div className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="font-bold text-gray-900 text-lg">
                          Found {aiRecommendations.length} perfect matches for: "{aiQuery}"
                        </span>
                      </div>
                      <button
                        onClick={clearAIRecommendations}
                        className="p-2 hover:bg-gray-100 rounded-xl transition"
                      >
                        <X className="w-6 h-6 text-gray-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for tools (e.g., 'email marketing', 'code editor', 'accounting')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-14 py-5 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-lg font-medium shadow-lg bg-white text-gray-900 placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-xl transition"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="text-purple-600 w-6 h-6" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-lg ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                All Tools
              </button>
              {toolsData.categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-md hover:shadow-lg ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-105'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl mb-6">
              <Search className="w-16 h-16 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                className={`group relative bg-white rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                  isInCompare(tool.id) ? 'border-green-500 shadow-lg shadow-green-500/20' : 'border-gray-200'
                } ${tool.featured ? 'ring-2 ring-purple-500/20' : ''}`}
              >
                {tool.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    Featured
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-black text-gray-900 flex-1 cursor-pointer hover:text-purple-600 transition" onClick={() => setSelectedTool(tool)}>
                      {tool.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200">
                        {toolsData.categories.find(c => c.id === tool.category)?.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCompare(tool);
                        }}
                        className={`p-2 rounded-xl transition-all shadow-md hover:shadow-lg ${
                          isInCompare(tool.id)
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={isInCompare(tool.id) ? 'Remove from comparison' : 'Add to comparison'}
                      >
                        <GitCompare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed cursor-pointer" onClick={() => setSelectedTool(tool)}>
                    {tool.shortDescription}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-gray-900">{tool.pricing.model}</span>
                    <span className="text-sm text-gray-600">
                      from <span className="font-bold text-green-600">{tool.pricing.tiers[0].price}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-200 transition">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedTool(tool)}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comparison Bar */}
      {compareTools.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t-4 border-green-500 shadow-2xl z-40 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                  <GitCompare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-black text-gray-900 text-lg">Compare Tools ({compareTools.length}/3)</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {compareTools.map(tool => (
                      <div key={tool.id} className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-xl border-2 border-green-200 font-bold shadow-md">
                        <span>{tool.name}</span>
                        <button
                          onClick={() => toggleCompare(tool)}
                          className="hover:bg-green-200 rounded-lg p-1 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={clearComparison}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Clear
                </button>
                <button
                  onClick={() => setShowComparison(true)}
                  disabled={compareTools.length < 2}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300" onClick={() => setSelectedTool(null)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-black text-white">{selectedTool.name}</h2>
                <p className="text-purple-100 mt-2 font-medium">{selectedTool.shortDescription}</p>
              </div>
              <button onClick={() => setSelectedTool(null)} className="p-2 hover:bg-white/20 rounded-xl transition">
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Pricing Plans
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedTool.pricing.tiers.map(tier => (
                    <div key={tier.name} className="border-2 border-gray-200 rounded-2xl p-4 hover:border-purple-300 hover:shadow-lg transition">
                      <div className="font-bold text-gray-900">{tier.name}</div>
                      <div className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-2">{tier.price}</div>
                      <div className="text-xs text-gray-600 mt-2">{tier.details}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4">Key Features</h3>
                <div className="grid gap-3">
                  {selectedTool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Pros
                  </h3>
                  <div className="space-y-2">
                    {selectedTool.pros.map((pro, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                        <span className="text-green-600 font-black text-lg">+</span>
                        <span className="text-gray-700 font-medium">{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-red-600" />
                    Cons
                  </h3>
                  <div className="space-y-2">
                    {selectedTool.cons.map((con, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                        <span className="text-red-600 font-black text-lg">-</span>
                        <span className="text-gray-700 font-medium">{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-6 h-6 text-purple-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-bold rounded-xl border border-purple-200 hover:scale-105 transition">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={selectedTool.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 text-lg"
                >
                  Visit Website
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparison && compareTools.length >= 2 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300" onClick={() => setShowComparison(false)}>
          <div className="bg-white rounded-3xl max-w-7xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <GitCompare className="w-8 h-8 text-white" />
                <h2 className="text-3xl font-black text-white">Tool Comparison</h2>
              </div>
              <button onClick={() => setShowComparison(false)} className="p-2 hover:bg-white/20 rounded-xl transition">
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-4 px-6 font-black text-gray-700 w-48 bg-gray-50">Feature</th>
                      {compareTools.map(tool => (
                        <th key={tool.id} className="text-left py-4 px-6 w-80 bg-gradient-to-br from-purple-50 to-blue-50">
                          <div className="font-black text-2xl text-gray-900">{tool.name}</div>
                          <div className="text-sm font-normal text-gray-600 mt-2">{tool.shortDescription}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-4 px-6 font-bold text-gray-700">Category</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-sm font-bold rounded-xl border border-purple-200">
                            {toolsData.categories.find(c => c.id === tool.category)?.name}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-bold text-gray-700">Pricing Model</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <span className="font-bold text-gray-900 text-lg">{tool.pricing.model}</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-4 px-6 font-bold text-gray-700">Starting Price</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <span className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{tool.pricing.tiers[0].price}</span>
                          <span className="text-sm text-gray-600 ml-2 font-medium">({tool.pricing.tiers[0].name})</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-bold text-gray-700">All Plans</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <div className="space-y-2">
                            {tool.pricing.tiers.map(tier => (
                              <div key={tier.name} className="text-sm p-2 bg-green-50 rounded-lg border border-green-200">
                                <span className="font-bold text-gray-900">{tier.name}:</span> <span className="font-bold text-green-600">{tier.price}</span>
                                <div className="text-gray-600 text-xs mt-1">{tier.details}</div>
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-4 px-6 font-bold text-gray-700">Key Features</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <ul className="space-y-2">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm p-2 bg-white rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-bold text-gray-700">Pros</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <ul className="space-y-2">
                            {tool.pros.map((pro, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm p-2 bg-green-50 rounded-lg border border-green-200">
                                <span className="font-black text-green-600">+</span>
                                <span className="text-gray-700 font-medium">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200 bg-gray-50">
                      <td className="py-4 px-6 font-bold text-gray-700">Cons</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <ul className="space-y-2">
                            {tool.cons.map((con, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm p-2 bg-red-50 rounded-lg border border-red-200">
                                <span className="font-black text-red-600">-</span>
                                <span className="text-gray-700 font-medium">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-gray-200">
                      <td className="py-4 px-6 font-bold text-gray-700">Tags</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-4 px-6">
                          <div className="flex flex-wrap gap-2">
                            {tool.tags.map(tag => (
                              <span key={tag} className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-bold rounded-lg border border-purple-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-gradient-to-br from-purple-50 to-blue-50">
                      <td className="py-6 px-6 font-bold text-gray-700">Visit Website</td>
                      {compareTools.map(tool => (
                        <td key={tool.id} className="py-6 px-6">
                          <a
                            href={tool.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
                          >
                            Visit {tool.name}
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}