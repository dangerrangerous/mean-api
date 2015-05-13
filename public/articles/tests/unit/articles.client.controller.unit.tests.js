// module('Choons-Rebuild')

describe('Testing Articles Controller', function() {
  var scope, ArticlesController;

    beforeEach(function() {
      module('Choons-Rebuild');

      jasmine.addMatchers({
        toEqualData: function(util, customEqualityTesters) {
          return {
            compare: function(actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
      inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ArticlesController = $controller('ArticlesController', { $scope: scope });
      });
    });

    it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Articles) {
      inject(function($httpBackend) {
        var sampleArticle = new Articles({
          title: 'An Article about MEAN',
          content: 'MEAN is so mean!'
        });

        var sampleArticles = [sampleArticle];

        $httpBackend.expectGET('api/articles').respond(sampleArticles);

        scope.find();
        $httpBackend.flush();

      expect(scope.articles).toEqualData(sampleArticles);
    });
  }));

  it('Should have a findOne method that uses $resource to retreive a single article', inject(function(Articles) {
    inject(function($httpBackend, $routeParams) {
      var sampleArticle = new Articles({
        title: 'An Article about MEAN',
        content: 'MEAN is so mean!'
      });

      $routeParams.articleId = 'abcdef123456789012345678';

      $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleArticle);

      scope.findOne();
      $httpBackend.flush();

      expect(scope.article).toEqualData(sampleArticle);
    });
  }));
});
