import { ImageSliderItem } from '../components';
import Status from '../magento/Status';

const parseSliderData = slider => slider.map(item => new ImageSliderItem(item.title, item.image, ''));

export const formatHomeData = (payload) => {
  const formattedData = {
    ...payload
  };
  const content = JSON.parse(formattedData.content.replace(/<\/?[^>]+(>|$)/g, ''));
  Object.keys(content.featuredCategories).forEach((key) => {
    formattedData[key] = {};
    formattedData[key].status = Status.DEFAULT;
    formattedData[key].items = [];
    formattedData[key].errorMessage = '';
  });
  formattedData.slider = parseSliderData(content.slider);
  formattedData.featuredCategories = content.featuredCategories;
  delete formattedData.content;
  return formattedData;
};
