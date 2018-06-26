/* feedreader.js
 *
 * This is the spec file for Jasmine
 */

/* 
 * don't run until the DOM is ready.
 */
$(function() {

    /* 
     * This suite is all about the RSS
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

        /* 
         * testing  that the each feed
         * has a defined property "url", that it is not
         * empty and that it is a valid url
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

        /* 
         * testing  that the each feed
         * has a defined property "name" and that it is not
         * empty.
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

    /* 
     * This suite is all about the menu
     * and dependency on user iteraction
     */
    describe('The menu', function() {

        /*
         * local cache
         */
        var menu,
            menuItems,
            menuIcon,

            /*
             * short alias function for DRY principle
             * @returns bool
             */
            isMenuHidden = function() {
                return $(document.body).hasClass('menu-hidden');
            }

        /*
         * redefine in each test case
         */
        beforeEach(function() {
          menu = $('.slide-menu');
          menuItems = menu.find('li');
          menuIcon = $('.menu-icon-link');
        });


        it('initially are not visible', function() {
          expect(isMenuHidden()).toBe(true);
        });


        it('opens when burger clicked', function() {
          expect(isMenuHidden()).toBe(true);
          menuIcon.trigger('click');
        });

        
        it('closes when burger clicked again', function() {
          
            /*
             * check if the menu is open close it
             */
            if(!isMenuHidden()) {
                menuIcon.trigger('click');
            }

            menuIcon.trigger('click');
            expect(isMenuHidden()).toBe(false);
            menuIcon.trigger('click');
            expect(isMenuHidden()).toBe(true);
        });

    });

    /* 
     * next two suites is for testing 
     * feed loading,
     */

    /* 
     * this suite testing inital loading
     */
    describe('Initial Entries', function() {

        it('Feeds must be rendered after successfully loading from server', function(done) {
          loadFeed(0, function() {
            var feeds  = $('.feed .entry');
            expect(feeds.length).not.toBeLessThan(1);
            done();
          });
        });

    });

    /* 
     * and this one checks that content is changed after new feed load
     */
    describe('New Feed Selection', function() {

        var oldFeeds,
            newFeeds,
            originalTimeout

            /*
             * this functions makes an array of urls from nodes
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

        it('Content must changes wher new feeds are loaded', function(done) {

            loadFeed(1, function() {
                oldFeeds  = nodeListToFlatArray( $('.feed .entry') );

                loadFeed(2, function() {
                    newFeeds  = nodeListToFlatArray( $('.feed .entry') );
                    expect(oldFeeds).not.toEqual(newFeeds);
                    done();
                });
            });
        });

        /*
         * set initial value back
         */
        afterAll(function() {
          jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
   });
}());
