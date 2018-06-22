/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         describe('# urls', function() {

            it('are defined', function() {
                allFeeds.map(function(feed){
                   expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                })
            });

            it('are not empty', function() {
                allFeeds.map(function(feed){
                    expect(feed.url).not.toBe('');
                })
            });

            it('have valid urls', function() {

                var urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

                allFeeds.map(function(feed){
                    expect(feed.url).toMatch(urlRegex);
                })
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         describe('# names', function() {

            it('are defined', function() {
                allFeeds.map(function(feed){
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).not.toBe(0);
                })
            });

            it('are not empty', function() {
                allFeeds.map(function(feed){
                    expect(feed.name).not.toBe('');
                })
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        var menu,
            menuItems,
            menuIcon,
            bodyHasMenuHiddenClass = function() {
              return /menu-hidden/.test($(document.body).attr('class'));
            },

            /*
             * visibility and display wasn't used in css
             * so we can't test menu easily
             * 
             * tested on left and top offCanvas translating
             * in some exotic cases this expression might not work
             *
             * @returns bool
             */
            isOffCanvas = function(el) {
              var clientRects = el.get(0).getClientRects()[0].toJSON();
              return clientRects.x <= 0 && Math.abs(clientRects.x) >= clientRects.width || 
                    clientRects.y <= 0 && Math.abs(clientRects.y) >= clientRects.width; 
            };

        beforeEach(function() {
          menu = $('.slide-menu');
          menuItems = menu.find('li');
          menuIcon = $('.menu-icon-link');
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('initially are not visible', function() {
          expect(bodyHasMenuHiddenClass()).toBe(true);
          expect(isOffCanvas(menu)).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('opens when burger clicked', function(done) {

          expect(bodyHasMenuHiddenClass()).toBe(true);
          expect(isOffCanvas(menu)).toBe(true);

          menu.on('transitionend', function open() {
            expect(bodyHasMenuHiddenClass()).toBe(false);
            expect(isOffCanvas(menu)).toBe(false);
            menu.off('transitionend', open);
            done();
          });

          menuIcon.trigger('click');
        });

        /**
         * There is an issue with testing this block separetely
         * "Open" work just fine, but "close" can't pass
         * without initially opened menu
         * so i decide to duplicate the code
         */

        it('closes when burger clicked again', function(done) {

          var onClose = function() {
                expect(bodyHasMenuHiddenClass()).toBe(true);
                expect(isOffCanvas(menu)).toBe(true);
                menu.off('transitionend', onClose);
                done();
              },
              onOpen = function() {
                expect(bodyHasMenuHiddenClass()).toBe(false);
                expect(isOffCanvas(menu)).toBe(false);
                menu.off('transitionend', onOpen);
                done();
              };

          if(bodyHasMenuHiddenClass()){

            // we don't want to call done() here
            // so it's managed by hand
            menu.on('transitionend', function initialOpen() {
              menu.off('transitionend', initialOpen);

              // ensure everything is ok
              expect(bodyHasMenuHiddenClass()).toBe(false);

              // now we can test "close" method
              menu.on('transitionend', onClose);
              menuIcon.trigger('click');
            });

            menuIcon.trigger('click');

          } else {
            menu.on('transitionend', onClose);
            menuIcon.trigger('click');
          }
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {


        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should be at least one entry', function(done) {
          loadFeed(0, function() {
            var feeds  = $('.feed .entry');
            expect(feeds.length).not.toBeLessThan(1);
            done();
          });
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var oldFeeds,
            newFeeds,
            originalTimeout,
            
            /**
             * It may be not efficient desision to compare links
             * but more detailed task are wasn't provided
             * :shrugs his shoulders:
             *
             * @returns bool
             */
            areFeedUrlsNotSame = function(arr1, arr2) {
                var result = true;

                for(var url1 of arr1) {
                    for(var url2 of arr2) {
                        if( url1 === url2 ) result = false;
                    }
                }

                return result;
            },

            /*
             * this functions helps to easily iterate
             * @returns []
             */
            nodeListToFlatArray = function($arr) {
                return Array.prototype.map.call($arr, function(el) {
                    return $(el).closest('.entry-link').attr('href');
                });
            }

        /**
         * managing timeout from original docs
         * @link https://jasmine.github.io/2.1/introduction#section-Asynchronous_Support
         */
        beforeAll(function() {
          originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
          jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        }); 

        it('should be at least one entry', function(done) {

            loadFeed(1, function() {
                oldFeeds  = nodeListToFlatArray( $('.feed .entry') );

                loadFeed(2, function() {
                    newFeeds  = nodeListToFlatArray( $('.feed .entry') );
                    expect(areFeedUrlsNotSame(oldFeeds, newFeeds)).toBe(true);
                    done();
                });
            });
        });

        afterAll(function() {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
   });
}());
