import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveRoast, saveBean, saveCup } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
    brewTime: '',
    roastName: '', 
    roastId: '',
  });

  const dispatch = useDispatch();

  const openRoastModal = (roast) => {
    if (isRoastModalOpen === false) {
      setRoast({
        roastName: roast?.roastName ?? '',
        roastDate: roast?.roastDate ?? `${dayjs().format('YYYY-MM-DD')}`,
        beanName: roast?.beanName ?? '',
        roastLevel: roast?.roastLevel ?? '',
        firstCracksTime: roast?.firstCracksTime ?? '',
        secondCracksTime: roast?.secondCracksTime ?? '',
        endRoastTime: roast?.endRoastTime ?? '',
        roastNotes: roast?.roastNotes ?? '',
        roastRating: roast?.roastRating
      });
      setIsRoastModalOpen(true);
    }
  };

  const openBeanModal = (bean) => {
    if(isBeanModalOpen === false) {
      setBean({
        beanName: bean?.beanName ?? '',
        origin: bean?.origin ?? '',
        processing: bean?.processing ?? '',
        elevation: bean?.elevation ?? '',
        cost: bean?.cost ?? '',
        beanNotes: bean?.beanNotes ?? '',
        beanRating: bean?.beanRating ?? '',
      });
      setIsBeanModalOpen(true);
    }
  };

  const openCupModal = (cup) => {
    if(isCupModalOpen === false) {
      setCup({
        timeOfDay: cup?.timeOfDay ?? `${dayjs().format('YYYY-MM-DD')} ${dayjs().format('h:mm A')}`,
        roastName: cup?.roastName ?? '',
        brewMethod: cup?.brewMethod ?? '',
        cupNotes: cup?.cupNotes ?? '',
        body: cup?.body ?? '',
        sweetness: cup?.sweetness ??'',
        tastingNotes: cup?.tastingNotes ?? '',
        brewTime: cup?.brewTime ?? '',
        cupRating: cup?.cupRating ?? ''
      });
      setIsCupModalOpen(true);
    }
  };

  const closeBeanModal = () => {
    setIsBeanModalOpen(false);
    history('/beans');
  };

  const closeCupModal = () => {
    setIsCupModalOpen(false);
    history('/cups');
  };
  
  const closeRoastModal = () => {
    setIsRoastModalOpen(false);
    history('/roasts');
  };

  const handleRoastChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setRoast({ ...roast, [name]: value });
    }
    else{
      setRoast({...roast, ...e})
    }
    
  };

  const handleBeanChange = (e) => {
    const { name, value } = e.target;
    setBean({ ...bean, [name]: value });
  };

  const handleCupChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setCup({ ...cup, [name]: value });
    }
    else{
      setCup({...cup, ...e})
    }
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