"use client";
import { Button, Card, CardBody } from "@heroui/react";
import { useLanguage } from "@/contexts/language/LanguageContext";
import { themeColor } from "@/config/theme";

function DownloadAppPage() {
  const { languageData, changeLanguage, language } = useLanguage();
  const auth = languageData?.auth;

  // Language switcher component
  const LanguageSwitcher = () => (
    <div className="absolute top-6 right-6 z-50">
      <Button
        size="sm"
        variant="bordered"
        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        onClick={() => changeLanguage(language === "en" ? "fr" : "en")}
      >
        {language === "en" ? "🇫🇷 Français" : "🇺🇸 English"}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          style={{ backgroundColor: themeColor.primary[500] }}
        ></div>
        <div
          className="absolute top-40 right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          style={{ backgroundColor: themeColor.secondary[500] }}
        ></div>
        <div
          className="absolute -bottom-8 left-40 w-72 h-72 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          style={{ backgroundColor: themeColor.primary[400] }}
        ></div>
      </div>

      <LanguageSwitcher />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${themeColor.primary[400]} 0%, ${themeColor.secondary[400]} 100%)`,
              }}
            >
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-white font-bold text-xl">Lightness</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="text-white/80 text-sm font-medium">
                {language === "en"
                  ? "✨ Digital Wellness App"
                  : "✨ Application de bien-être numérique"}
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {language === "en" ? "Find Your" : "Trouvez votre"}
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: `linear-gradient(135deg, ${themeColor.primary[400]} 0%, ${themeColor.secondary[400]} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {language === "en" ? "Digital Balance" : "équilibre numérique"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              {language === "en"
                ? "Transform your relationship with technology. Lightness helps you stay mindful, focused, and in control of your digital life."
                : "Transformez votre relation avec la technologie. Lightness vous aide à rester conscient, concentré et maître de votre vie numérique."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                as="a"
                href="https://play.google.com/store/apps/details?id=com.lemsainnovation.lightnessworld&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${themeColor.primary[500]} 0%, ${themeColor.primary[600]} 100%)`,
                }}
                startContent={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                }
              >
                {language === "en" ? "Get for Android" : "Obtenir pour Android"}
              </Button>

              <Button
                as="a"
                href="https://apps.apple.com/us/app/lightness/id6741383097"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="bordered"
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
                startContent={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                }
              >
                {language === "en" ? "Get for iOS" : "Obtenir pour iOS"}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10K+</div>
                <div className="text-white/60 text-sm">
                  {language === "en" ? "Active Users" : "Utilisateurs actifs"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.8★</div>
                <div className="text-white/60 text-sm">
                  {language === "en" ? "App Rating" : "Note de l'app"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-white/60 text-sm">
                  {language === "en" ? "Countries" : "Pays"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === "en"
                  ? "Why Choose Lightness?"
                  : "Pourquoi choisir Lightness ?"}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {language === "en"
                  ? "Discover the features that make Lightness the perfect companion for your digital wellness journey"
                  : "Découvrez les fonctionnalités qui font de Lightness le compagnon parfait pour votre voyage de bien-être numérique"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.primary[500]} 0%, ${themeColor.secondary[500]} 100%)`,
                    }}
                  >
                    <span className="text-2xl">🧘</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {language === "en"
                      ? "Mindful Usage"
                      : "Utilisation consciente"}
                  </h3>
                  <p className="text-white/70">
                    {language === "en"
                      ? "Track your screen time and develop healthier digital habits with personalized insights"
                      : "Suivez votre temps d'écran et développez des habitudes numériques plus saines avec des insights personnalisés"}
                  </p>
                </CardBody>
              </Card>

              {/* Feature 2 */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.primary[400]} 0%, ${themeColor.primary[600]} 100%)`,
                    }}
                  >
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {language === "en" ? "Focus Mode" : "Mode concentration"}
                  </h3>
                  <p className="text-white/70">
                    {language === "en"
                      ? "Eliminate distractions and boost your productivity with intelligent focus sessions"
                      : "Éliminez les distractions et boostez votre productivité avec des sessions de concentration intelligentes"}
                  </p>
                </CardBody>
              </Card>

              {/* Feature 3 */}
              <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardBody className="p-8 text-center">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.secondary[500]} 0%, ${themeColor.secondary[600]} 100%)`,
                    }}
                  >
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {language === "en"
                      ? "Wellness Tracking"
                      : "Suivi du bien-être"}
                  </h3>
                  <p className="text-white/70">
                    {language === "en"
                      ? "Monitor your digital wellness progress and celebrate your achievements"
                      : "Surveillez vos progrès en bien-être numérique et célébrez vos réussites"}
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card
              className="backdrop-blur-md border border-white/20"
              style={{
                background: `linear-gradient(135deg, ${themeColor.primary[600]}20 0%, ${themeColor.secondary[600]}20 100%)`,
              }}
            >
              <CardBody className="p-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {language === "en" ? "Ready to Start?" : "Prêt à commencer ?"}
                </h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  {language === "en"
                    ? "Join thousands of users who have transformed their digital lives with Lightness"
                    : "Rejoignez des milliers d'utilisateurs qui ont transformé leur vie numérique avec Lightness"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    as="a"
                    href="https://play.google.com/store/apps/details?id=com.lemsainnovation.lightnessworld&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="text-white font-semibold px-8 py-4 text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.primary[500]} 0%, ${themeColor.primary[600]} 100%)`,
                    }}
                    startContent={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    }
                  >
                    {auth?.signup?.appDownload?.androidButton ||
                      (language === "en"
                        ? "Download for Android"
                        : "Télécharger pour Android")}
                  </Button>

                  <Button
                    as="a"
                    href="https://apps.apple.com/us/app/lightness/id6741383097"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="text-white font-semibold px-8 py-4 text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${themeColor.secondary[500]} 0%, ${themeColor.secondary[600]} 100%)`,
                    }}
                    startContent={
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                      </svg>
                    }
                  >
                    {auth?.signup?.appDownload?.iosButton ||
                      (language === "en"
                        ? "Download for iOS"
                        : "Télécharger pour iOS")}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${themeColor.primary[400]} 0%, ${themeColor.secondary[400]} 100%)`,
                }}
              >
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-white font-bold text-xl">Lightness</span>
            </div>
            <p className="text-white/50 text-sm mb-4">
              {language === "en"
                ? "Transform your digital life with mindfulness and balance"
                : "Transformez votre vie numérique avec conscience et équilibre"}
            </p>
            <p className="text-white/30 text-xs">
              {language === "en"
                ? "© 2024 Lightness. All rights reserved."
                : "© 2024 Lightness. Tous droits réservés."}
            </p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default DownloadAppPage;
