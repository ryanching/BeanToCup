import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveRoast, saveBean, saveCup } from '../redux/actions';

export const useModalHandlers = () => {
  const [isRoastModalOpen, setIsRoastModalOpen] = useState(false);
  const [isBeanModalOpen, setIsBeanModalOpen] = useState(false);
  const [isCupModalOpen, setIsCupModalOpen] = useState(false);
  const [roast, setRoast] = useState({
    name: '',
    beanType: '',
    roastLevel: '',
    firstCracksTime: '',
    secondCracksTime: '',
    endRoastTime: ''
  });
  const [bean, setBean] = useState({
    name: '',
    origin: '',
    processing: '',
    elevation: '',
    cost: '',
    tastingNotes: ''
  });
  const [cup, setCup] = useState({
    timeOfDay: '',
    roast: '',
    brewMethod: '',
    body: '',
    sweetness: '',
    tastingNotes: '',
    brewTime: ''
  });

  const dispatch = useDispatch();

  const openRoastModal = () => {
    setRoast({
      name: '',
      beanType: '',
      roastLevel: '',
      firstCracksTime: '',
      secondCracksTime: '',
      endRoastTime: ''
    });
    setIsRoastModalOpen(true);
  };

  const closeRoastModal = () => {
    setIsRoastModalOpen(false);
  };

  const openBeanModal = () => {
    setBean({
      name: '',
      origin: '',
      processing: '',
      elevation: '',
      cost: '',
      tastingNotes: ''
    });
    setIsBeanModalOpen(true);
  };

  const closeBeanModal = () => {
    setIsBeanModalOpen(false);
  };

  const openCupModal = () => {
    setCup({
      timeOfDay: '',
      roast: '',
      brewMethod: '',
      body: '',
      sweetness: '',
      tastingNotes: '',
      brewTime: ''
    });
    setIsCupModalOpen(true);
  };

  const closeCupModal = () => {
    setIsCupModalOpen(false);
  };

  const handleRoastChange = (e) => {
    const { name, value } = e.target;
    setRoast({ ...roast, [name]: value });

    // Open the New Bean modal if "New Bean" is selected
    if (name === 'beanType' && value === 'newBean') {
      closeRoastModal();
      openBeanModal();
    }
  };

  const handleBeanChange = (e) => {
    const { name, value } = e.target;
    setBean({ ...bean, [name]: value });
  };

  const handleCupChange = (e) => {
    const { name, value } = e.target;
    setCup({ ...cup, [name]: value });
  };

  const handleRoastSave = () => {
    dispatch(saveRoast(roast));
    closeRoastModal();
  };

  const handleBeanSave = () => {
    dispatch(saveBean(bean));
    closeBeanModal();
  };

  const handleCupSave = () => {
    dispatch(saveCup(cup));
    closeCupModal();
  };

  return {
    isRoastModalOpen,
    isBeanModalOpen,
    isCupModalOpen,
    roast,
    bean,
    cup,
    openRoastModal,
    closeRoastModal,
    openBeanModal,
    closeBeanModal,
    openCupModal,
    closeCupModal,
    handleRoastChange,
    handleBeanChange,
    handleCupChange,
    handleRoastSave,
    handleBeanSave,
    handleCupSave
  };
};