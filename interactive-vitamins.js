(function() {
   var slides = [
      {
         title: 'Vitamin D',
         subtitle: '',
         benefits:
            'Supports bone and skeletal health, boosts brain function, prevents mood disorders, balances hormones.',
         sources:
            '15 minutes in the sunshine without sunscreen, tuna, salmon, cheese, and egg yolk.',
         imageSourceRoot: 'vitamin-d'
      },
      {
         title: 'B Vitamins',
         subtitle: 'B-12',
         benefits:
            'Important nutrients for metabolic function along with folate. Promotes brain function, prevents fatigue, and boosts cognitive functions. Turn calories into fuel, help with cellular processes like growth and energy expenditure.',
         sources:
            'Eggs, milk, yogurt, meat, fish, spinach, asparagus, and citrus fruits.',
         imageSourceRoot: 'b-vitamins'
      },
      {
         title: 'Antioxidant Vitamins',
         subtitle: '(A,C,E)',
         benefits:
            'Antioxidant vitamins A, C, and E fight effects of aging, prevent free radical damage, prevent problems with heart, eyes, skin, and brain. Vitamin C boosts immunity, and vitamins A and E protect healthy cells.',
         sources:
            'Oranges, broccoli, brussels sprouts, and lemons are high in vitamin C. Vitamin A can be found in fortified breakfast cereals, peppers, carrots, and sweet potatoes. Find vitamin E in vegetable oils, nuts, and seeds.',
         imageSourceRoot: 'antioxidants'
      },
      {
         title: 'Magnesium',
         subtitle: '',
         benefits:
            'I an electrolyte that regulates calcium, potassium, and sodium. Supports bone health and prevents diabetes and premenstrual syndrome. Magnesium deficiency can lead to leg cramps, insomnia, headaches, and digestive issues.',
         sources:
            'Whole wheat, spinach, quinoa, almonds, avocado, black beans, edamame, and dark chocolate.',
         imageSourceRoot: 'magnesium'
      },
      {
         title: 'Omega-3',
         subtitle: '',
         benefits:
            'Important anti-inflammatory vitamins. These fatty-acids work in balance with omega-6 fatty acids to promote health in the heart, brain, and immune system. People should strive for a 2:1 ratio of omega 6 to omega-3s to prevent arthritis, heart disease and Alzheimer’s.',
         sources:
            'Wild-caught fish like salmon, mackerel, sardines or anchovies. Omega-3 can also be found in canola oil, soybeans, eggs, and chia seeds.',
         imageSourceRoot: 'omega-3'
      },
      {
         title: 'Calcium',
         subtitle: '',
         benefits:
            'Strengthens bones, regulates rhythms in the heart, enhances muscle function, and controls blood pressure and cholesterol levels.',
         sources:
            'Cow’s milk, yogurt, and kefir, collard greens, kale, broccoli, and beans.',
         imageSourceRoot: 'calcium'
      },
      {
         title: 'Iodine',
         subtitle: '',
         benefits:
            'Iodine is an important nutrient that helps to fight off conditions like hypothyroidism, fatigue, and hormonal imbalance. Pregnant women need to be especially careful to consume adequate amounts of iodine since it supports healthy brain development of the unborn fetus.',
         sources: 'Iodized salt, eggs, prunes, dairy, code, tuna, and shrimp.',
         imageSourceRoot: 'iodine'
      }
   ];
   var slideIndex = 0;
   var titleNodes = [];
   var pagerDots = [];
   var foodImagesContainer;

   document.onreadystatechange = function() {
      if (document.readyState === 'interactive') {
         start();
      }
   };

   function addClass(element, newClass) {
      element.className += ` ${newClass}`;
   }

   function removeClass(element, oldClass) {
      var classes = element.className.split(' ');
      var oldClassIndex = classes.indexOf(oldClass);
      classes.splice(oldClassIndex, 1);
      element.className = classes.join(' ');
   }

   function handleArrowClick(movingRight) {
      /* remove active classes */
      removeClass(titleNodes[slideIndex], 'iv-fade-in');
      removeClass(pagerDots[slideIndex], 'iv-pager-dot-active');
      if (movingRight) {
         slideIndex++;
         if (slideIndex > slides.length - 1) {
            slideIndex = 0;
         }
      } else {
         slideIndex--;
         if (slideIndex < 0) {
            slideIndex = slides.length - 1;
         }
      }
      addClass(pagerDots[slideIndex], 'iv-pager-dot-active');
      addClass(titleNodes[slideIndex], 'iv-fade-in');

      /* slide food image */
      foodImagesContainer.style = `width: ${200 *
         slides.length}px; transform: translateX(-${slideIndex * 200}px)`;
   }

   function start() {
      var root = document.getElementById('interactive-vitamins-root');

      var titlesContainer = document.createElement('div');
      titlesContainer.className = 'iv-title-container';
      root.appendChild(titlesContainer);

      var foodRow = document.createElement('div');
      foodRow.className = 'iv-food-row';
      root.appendChild(foodRow);

      var leftArrow = document.createElement('div');
      leftArrow.className = 'iv-arrow';
      foodRow.appendChild(leftArrow);
      leftArrow.onclick = function() {
         handleArrowClick(false);
      };

      var foodsContainer = document.createElement('div');
      foodsContainer.className = 'iv-foods-container';
      foodRow.appendChild(foodsContainer);

      foodImagesContainer = document.createElement('div');
      foodImagesContainer.className = 'iv-food-images-container';
      foodImagesContainer.style = `width: ${slides.length * 200}px`;
      foodsContainer.appendChild(foodImagesContainer);

      var rightArrow = document.createElement('div');
      rightArrow.className = 'iv-arrow';
      foodRow.appendChild(rightArrow);
      rightArrow.onclick = function() {
         handleArrowClick(true);
      };

      var pager = document.createElement('div');
      pager.className = 'iv-pager';
      root.appendChild(pager);

      var infoRow = document.createElement('div');
      infoRow.className = 'iv-info-row';
      root.appendChild(infoRow);

      slides.forEach(function(slide, index) {
         /* titles */
         var titleNode = document.createElement('div');
         titleNode.innerHTML = `<span>${slide.title}</span><span>${
            slide.subtitle
         }</span>`;
         titleNode.className = `iv-title ${
            index === slideIndex ? 'iv-fade-in' : ''
         }`;
         titlesContainer.appendChild(titleNode);
         titleNodes.push(titleNode);

         /* food images */
         var foodImageBox = document.createElement('div');
         foodImageBox.className = 'iv-foods-img-box';
         foodImagesContainer.appendChild(foodImageBox);

         var foodImage = document.createElement('img');
         foodImage.className = 'iv-food-img';
         foodImage.src = `assets/image/${slide.imageSourceRoot}-food.png`;
         foodImageBox.appendChild(foodImage);

         /* pager */
         var pageDot = document.createElement('div');
         pageDot.className = `iv-pager-dot ${
            index === slideIndex ? 'iv-pager-dot-active' : ''
         }`;
         pager.appendChild(pageDot);
         pagerDots.push(pageDot);
      });
   }
})();
