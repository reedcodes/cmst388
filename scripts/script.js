var body = document.getElementsByTagName('body')[0];

var banner = document.getElementById('photos');
if( banner != null ) {
  var bannerPhoto = banner.getElementsByTagName('img')[0];
}



/*****
  homepage banner image change
*****/

var count = 0;
var bannerPhotos = [
  ['bookshelves', 'a view of an aisle in the store, with bookshelves on the left and right'],
  ['bookstack', 'a stack of used college textbooks'],
  ['booktables', 'tables and sheleves full of books in the store'],
  ['student', 'a black female student wearing a hat sits reading the book Web Standards Solutions by author Dan Cederholm']
];

if( banner != null ) {
  if( banner.className == 'rotator' ) {
    setInterval( function() {
      if( count >= bannerPhotos.length ) { count = 0; }
      bannerPhoto.setAttribute('alt', bannerPhotos[count][1]);
      bannerPhoto.setAttribute('src', 'images/' + bannerPhotos[count][0] + '.jpg');
      count++;
    }, 5000);
  }
}



/*****
  replace map image with interactive Google map
*****/

if( banner != null ) {
  if( banner.className == 'gmap' ) {
    banner.innerHTML = '<div class="iframe ratio169"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d776.1729483882485!2d-77.06456464385003!3d38.90816279096653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1450050766594" allowfullscreen></iframe></div>';
  }
}



/*****
  filter store events
*****/

if( body.className == 'events' ) {
  var eventTypes = [
    ['instruction', 'Please select an event type to filter the list'],
    ['all', 'Show all events'],
    ['sale', 'Store sale'],
    ['notice', 'Store notice'],
    ['openmic', 'Open mic night'],
    ['signing', 'Book &amp; author signing'],
    ['movie', 'Movie screening'],
    ['bookclub', 'Book club'],
    ['meetup', 'Meetups']
  ];

  document.eventForm.innerHTML = '<select id="eventList" name="eventList"></select>';

  var eventOptions = '';
  for( i = 0; i < eventTypes.length; i++ ) {
    eventOptions += '<option value="' + eventTypes[i][0] + '">' + eventTypes[i][1] + '</option>';
  }
  document.eventForm.eventList.innerHTML = eventOptions;

  document.eventForm.eventList.addEventListener('change', function(event) {
    var selected = document.eventForm.eventList.value,
      events = document.getElementById('events'),
      eventBoxes = events.getElementsByTagName('li');
    for( i = 0; i < eventBoxes.length; i++ ) {
      if( selected == 'all' ) {
        eventBoxes[i].style.display = 'block';
      } else if( selected == eventBoxes[i].className ) {
        eventBoxes[i].style.display = 'block';
      } else {
        eventBoxes[i].style.display = 'none';
      }
    }
  });

}



/*****
  about: compare prices
*****/

if( body.className == 'about' ) {

  /*

  document.eventForm.innerHTML = '<select id="eventList" name="eventList"></select>';

  var eventOptions = '';
  for( i = 0; i < eventTypes.length; i++ ) {
    eventOptions += '<option value="' + eventTypes[i][0] + '">' + eventTypes[i][1] + '</option>';
  }
  document.eventForm.eventList.innerHTML = eventOptions;

  */

  var schoolList = document.getElementById('schools');
  if( banner != null ) {
    var schools = schoolList.getElementsByTagName('a');
  }
  schoolList.style.display = 'none';

  var schoolTables = document.getElementsByClassName('compare');
  for( i = 0; i < schoolTables.length; i++ ) {
    schoolTables[i].style.display = 'none';
  }

  document.schoolForm.innerHTML = '<p><select id="schoolsList" name="schoolsList"></select></p> <p><input type="submit" id="submit" name="submit" /> <input type="reset" id="reset" name="reset" /></p>';

  var schoolOptions = '';
  for( i = 0; i < schools.length; i++ ) {
    schoolOptions += '<option value="' + schools[i].className + '">' + schools[i].innerHTML + '</option>';
  }
  document.schoolForm.schoolsList.innerHTML = schoolOptions;

  var submit = document.schoolForm.submit;
  submit.addEventListener('click', function(event) {
    for( i = 0; i < schoolTables.length; i++ ) {
      schoolTables[i].style.display = 'none';
    }
    var selected = document.schoolForm.schoolsList.value;
    var selectedTable = document.getElementById(selected);
    selectedTable.style.display = 'table';
    event.preventDefault();
  });

  var reset = document.schoolForm.reset;
  reset.addEventListener('click', function(event) {
    for( i = 0; i < schoolTables.length; i++ ) {
      schoolTables[i].style.display = 'none';
    }
  });

}



/*****
  Contact Us form
*****/

// style errors
function styleErrors(element) {
  element.style.border = '1px solid #cc0000';
  element.style.background = '#fefecc';
}

if( body.className == 'contact' ) {

  var submit = document.contact.submit;
  submit.addEventListener('click', function(event) {

    //reset errors
    var errors = 0;
    for( i = 0; i < document.contact.length; i++ ) {
      document.contact[i].style.border = '';
      document.contact[i].style.background = '';
    }

    // either EMAIL or PHONE must be entered
    var email = document.contact.email,
      phone = document.contact.phone;
    if(
      ( email.value == '' || email.value == null ) &&
      ( phone.value == '' || phone.value == null )
    ) {
      errors++;
      alert( 'You must enter either your email address or your phone number.' );
      styleErrors(email);
      styleErrors(phone);
    }

    // newsletter option must be selected
    var newsletter = document.getElementsByName('newsletter'),
      newsSelected = false,
      newsYes = false;
    for( i = 0; i < newsletter.length; i++ ) {
      if( newsletter[i].checked ) {
        newsSelected = true;
        if( newsletter[i].value = 'offersYes' ) {
          newsYes = true;
        }
        break;
      }
    }
    if( newsSelected == false ) {
      alert( 'You must choose whether or not to subscribe to the email newsletter.' );
      styleErrors(newsOptions);
    }

    // check errors or submit form
    if( errors > 0 ) {
      alert('Please correct the highlighted errors.');
      event.preventDefault();
    } else {
      document.contact.submit();
    }

  });

}
