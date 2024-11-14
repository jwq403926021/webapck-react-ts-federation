import {useTranslation} from "react-i18next";

export interface HomeProps {}
const Home: React.FC<HomeProps> = () => {
  const { t, i18n } = useTranslation();

  function switchLng() {
    console.log(i18n.language);
    i18n.changeLanguage(i18n.language === 'en' ? 'jp' : 'en')
  }

  return (
    <div>
      <button onClick={switchLng}>switchLng</button>
      Home: {t('welcome')}
    </div>
  );
};

export default Home;