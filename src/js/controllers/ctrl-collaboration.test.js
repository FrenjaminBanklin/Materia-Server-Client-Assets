describe('CollaborationController', () => {
	let $controller
	var mockPlease
	let $scope

	beforeEach(() => {
		mockPlease = { $apply: jest.fn() }
		let app = angular.module('materia')
		app.factory('Please', () => mockPlease)

		require('../materia-namespace')
		require('../materia-constants')
		require('../materia/materia.coms.json')
		require('../services/srv-selectedwidget')
		require('../services/srv-datetime')
		require('../services/srv-widget')
		require('../services/srv-user')
		require('ngmodal/dist/ng-modal')
		require('hammerjs')
		require('./ctrl-alert')
		require('./ctrl-collaboration')

		inject(_$controller_ => {
			$controller = _$controller_
		})

		$scope = {
			$watch: jest.fn(),
			$on: jest.fn()
		}
	})

	it('defines expected scope vars - accessLevels', () => {
		$controller('CollaborationController', { $scope })
		expect($scope.accessLevels).toHaveProperty('1')
		expect($scope.accessLevels).toHaveProperty('30')
		expect($scope.accessLevels[1]).toHaveProperty('text')
		expect($scope.accessLevels[1].text).toBe('View Scores')
		expect($scope.accessLevels[30].value).toBe(30)
	})
})
