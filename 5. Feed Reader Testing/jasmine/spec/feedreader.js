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


    describe('The menu', function() {

        var menu,
            menuItems,
            menuIcon;

        beforeEach(function() {
          menu = $('.slide-menu');
          menuItems = menu.find('li');
          menuIcon = $('.menu-icon-link');
        });


        it('initially are not visible', function() {
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });


        it('opens when burger clicked', function() {
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
          menuIcon.trigger('click');
        });

        /*
         * There is an issue with testing this block separetely
         * "Open" work just fine, but "close" can't pass
         * without initially opened menu
         * so i decide to duplicate the code
         */
        it('closes when burger clicked again', function() {
          
          if(!$(document.body).hasClass('menu-hidden')) {
            menuIcon.trigger('click');
          }
          
          menuIcon.trigger('click');
          expect($(document.body).hasClass('menu-hidden')).toBe(false);
          menuIcon.trigger('click');
          expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

    });

    describe('Initial Entries', function() {

        it('should be at least one entry', function(done) {
          loadFeed(0, function() {
            var feeds  = $('.feed .entry');
            expect(feeds.length).not.toBeLessThan(1);
            done();
          });
        });

    });

    describe('New Feed Selection', function() {

        var oldFeeds,
            newFeeds,
            originalTimeout,
            
            /*
             * It may be not efficient desision to compare links
             * but more detailed task are wasn't provided
             * :shrugs his shoulders:
             *
             * @returns bool
             */
            areFeedUrlsNotSame = function(arr1, arr2) {
                for(var url1 of arr1) {
                    for(var url2 of arr2) {
                        expect( url1 === url2 ).toBe(false);
                    }
                }
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

        /*
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
                    areFeedUrlsNotSame(oldFeeds, newFeeds);
                    done();
                });
            });
        });

        afterAll(function() {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
   });
}());
