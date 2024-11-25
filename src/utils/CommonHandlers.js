import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveRoast, saveBean, saveCup } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

export const useModalHandlers = () => {
  const history = useNavigate();
  const [isRoastModalOpen, setIsRoastModalOpen] = useState(false);
  const [isBeanModalOpen, setIsBeanModalOpen] = useState(false);
  const [isCupModalOpen, setIsCupModalOpen] = useState(false);
  const [roast, setRoast] = useState({
    name: '',
    beanName: '',
    beanId: '',
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
    if (isRoastModalOpen === false) {
      setRoast({
        roastName: '',
        beanName: '',
        roastLevel: '',
        firstCracksTime: '',
        secondCracksTime: '',
        endRoastTime: ''
      });
      setIsRoastModalOpen(true);
    }
  };

  const closeRoastModal = () => {
    setIsRoastModalOpen(false);
    history('/roasts');
  };

  const openBeanModal = () => {
    if(isBeanModalOpen === false) {
      setBean({
        beanName: '',
        origin: '',
        processing: '',
        elevation: '',
        cost: '',
        tastingNotes: ''
      });
      setIsBeanModalOpen(true);
    }
  };

  const closeBeanModal = () => {
    setIsBeanModalOpen(false);
    history('/beans');
  };

  const openCupModal = (cup) => {
    if(isCupModalOpen === false) {
      setCup({
        timeOfDay: cup.timeOfDay ?? '',
        roastName: cup.roastName ?? '',
        brewMethod: cup.brewMethod ?? 'test',
        cupNotes: cup.cupNotes ?? '',
        body: cup.body ?? '',
        sweetness: cup.sweetness ??'',
        tastingNotes: cup.tastingNotes ?? '',
        brewTime: cup.brewTime ?? '',
        cupRating: cup.cupRating ?? ''
      });
      setIsCupModalOpen(true);
    }
  };

  const closeCupModal = () => {
    setIsCupModalOpen(false);
    history('/cups');
  };

  const handleRoastChange = (e) => {
    const { name, value } = e.target;
    setRoast({ ...roast, [name]: value });
    
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