#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the import path mappings
const importMappings = {
  // Context imports
  '../contexts/AuthContext': '../../app/providers/AuthContext',
  '../contexts/LanguageContext': '../../app/providers/LanguageContext', 
  '../contexts/ThemeContext': '../../app/providers/ThemeContext',
  '../contexts/RegistrationContext': '../../app/providers/RegistrationContext',
  
  // Navigation imports
  '../navigation': '../../app/navigation',
  '../navigation/types': '../../app/navigation/types',
  
  // Constants imports
  '../constants': '../../shared/constants',
  '../constants/designSystem': '../../shared/constants/designSystem',
  '../constants/themeColors': '../../shared/constants/themeColors',
  
  // Components imports
  '../components/ui': '../../shared/components/ui',
  '../components/registration': '../../shared/components/layout',
  '../components/forms/Input': '../../shared/components/forms/Input',
  '../components/forms/Button': '../../shared/components/forms/Button',
  '../components/SplashScreen': '../../shared/components/ui/SplashScreen',
  
  // Services imports
  '../services': '../../shared/services',
  
  // Utils imports
  '../utils/validation': '../../shared/utils/validation',
  '../utils/responsive': '../../shared/utils/responsive',
  
  // Styles imports
  '../styles/responsiveStyles': '../../shared/constants/responsiveStyles',
  
  // I18n imports
  '../i18n': '../../shared/constants/i18n',
  
  // Specific component imports
  '../components/ui/GradientBackground': '../../shared/components/ui/GradientBackground',
  '../components/ui/GlassmorphismContainer': '../../shared/components/ui/GlassmorphismContainer',
  '../components/ui/GradientText': '../../shared/components/ui/GradientText',
  '../components/ui/LoginButton': '../../shared/components/ui/LoginButton',
  '../components/ui/QuickInsightsBar': '../../shared/components/ui/QuickInsightsBar',
  
  // Service specific imports
  '../services/config/apiConfig': '../../shared/services/api/apiConfig',
  '../services/config/endpoints': '../../shared/services/api/endpoints',
  '../services/errors/ApiError': '../../shared/services/api/ApiError',
  '../services/types/ApiTypes': '../../shared/types/ApiTypes',
  '../services/monitoring/ApiAnalytics': '../../shared/services/ApiAnalytics',
  '../services/cache/ApiCache': '../../shared/services/ApiCache',
  '../services/optimization/RequestOptimizer': '../../shared/services/RequestOptimizer',
};

// Function to fix imports in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply each mapping
    for (const [oldPath, newPath] of Object.entries(importMappings)) {
      const regex = new RegExp(`from ['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
      if (content.includes(oldPath)) {
        content = content.replace(regex, `from '${newPath}'`);
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to recursively find and fix all TypeScript/JavaScript files
function fixImportsRecursively(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixImportsRecursively(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      fixImportsInFile(filePath);
    }
  }
}

// Start fixing imports
console.log('Starting import path fixes...');
fixImportsRecursively('./src');
console.log('Import path fixes completed!');
