#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the import path mappings for the new structure
const importMappings = {
  // Context imports - from features to app/providers
  '../../contexts/AuthContext': '../../../app/providers/AuthContext',
  '../../contexts/LanguageContext': '../../../app/providers/LanguageContext', 
  '../../contexts/ThemeContext': '../../../app/providers/ThemeContext',
  '../../contexts/RegistrationContext': '../../../app/providers/RegistrationContext',
  
  // Navigation imports - from features to app/navigation
  '../../navigation/types': '../../../app/navigation/types',
  
  // Constants imports - from features to shared/constants
  '../../constants': '../../../shared/constants',
  '../../constants/designSystem': '../../../shared/constants/designSystem',
  '../../constants/themeColors': '../../../shared/constants/themeColors',
  
  // Components imports - from features to shared/components
  '../../components/ui': '../../../shared/components/ui',
  '../../components/registration': '../../../shared/components/layout',
  '../../components/forms/Input': '../../../shared/components/forms/Input',
  '../../components/forms/Button': '../../../shared/components/forms/Button',
  '../../components/SplashScreen': '../../../shared/components/ui/SplashScreen',
  
  // Services imports - from features to shared/services
  '../../services': '../../../shared/services',
  
  // Utils imports - from features to shared/utils
  '../../utils/validation': '../../../shared/utils/validation',
  '../../utils/responsive': '../../../shared/utils/responsive',
  
  // Styles imports - from features to shared/constants
  '../../styles/responsiveStyles': '../../../shared/constants/responsiveStyles',
  
  // I18n imports - from features to shared/constants
  '../../i18n': '../../../shared/constants/i18n',
  
  // Specific component imports
  '../../components/ui/GradientBackground': '../../../shared/components/ui/GradientBackground',
  '../../components/ui/GlassmorphismContainer': '../../../shared/components/ui/GlassmorphismContainer',
  '../../components/ui/GradientText': '../../../shared/components/ui/GradientText',
  '../../components/ui/LoginButton': '../../../shared/components/ui/LoginButton',
  '../../components/ui/QuickInsightsBar': '../../../shared/components/ui/QuickInsightsBar',
  
  // Service specific imports - from shared/services to correct paths
  '../config/apiConfig': '../api/apiConfig',
  '../config/endpoints': '../api/endpoints',
  '../errors/ApiError': '../api/ApiError',
  '../types/ApiTypes': '../../types/ApiTypes',
  '../monitoring/ApiAnalytics': '../ApiAnalytics',
  '../cache/ApiCache': '../ApiCache',
  '../optimization/RequestOptimizer': '../RequestOptimizer',
  
  // Context imports from shared components
  '../../contexts/ThemeContext': '../../../app/providers/ThemeContext',
  '../../contexts/LanguageContext': '../../../app/providers/LanguageContext',
  
  // Constants imports from shared components
  '../../constants': '../../../shared/constants',
  
  // Service imports from shared components
  '../errors/ApiError': '../api/ApiError',
  
  // Fix relative path issues
  './ui': './ui',
  '../../shared/constants': '../constants',
  '@/constants': '../constants',
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
console.log('Starting comprehensive import path fixes...');
fixImportsRecursively('./src');
console.log('Comprehensive import path fixes completed!');
