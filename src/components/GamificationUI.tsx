import React, { useState } from 'react';
import { Trophy, Star, Zap, Target, Award, TrendingUp, Users, Crown, Medal, Gift } from 'lucide-react';

const GamificationUI = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    level: 12,
    xp: 2850,
    xpToNext: 3200,
    totalPoints: 15420,
    streak: 7,
    rank: 156,
    totalUsers: 50000
  };

  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first course",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-10",
      rarity: "common"
    },
    {
      id: 2,
      name: "Speed Learner",
      description: "Complete 3 courses in one week",
      icon: "⚡",
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "rare"
    },
    {
      id: 3,
      name: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      icon: "🧠",
      earned: true,
      earnedDate: "2024-01-20",
      rarity: "epic"
    },
    {
      id: 4,
      name: "Perfectionist",
      description: "Complete a course with 100% score",
      icon: "💎",
      earned: false,
      progress: 80,
      rarity: "legendary"
    },
    {
      id: 5,
      name: "Marathon Runner",
      description: "Study for 30 days straight",
      icon: "🏃",
      earned: false,
      progress: 23,
      rarity: "epic"
    },
    {
      id: 6,
      name: "Knowledge Seeker",
      description: "Complete 10 different courses",
      icon: "📚",
      earned: false,
      progress: 60,
      rarity: "rare"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Alex Chen", xp: 45200, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: false },
    { rank: 2, name: "Sarah Johnson", xp: 42800, avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: false },
    { rank: 3, name: "Mike Rodriguez", xp: 38900, avatar: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: false },
    { rank: 4, name: "Emma Davis", xp: 35600, avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: false },
    { rank: 5, name: "John Smith", xp: 32100, avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: false },
    { rank: 156, name: "You", xp: userStats.totalPoints, avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150", isCurrentUser: true }
  ];

  const achievements = [
    {
      title: "Course Completed",
      description: "Finished 'React Fundamentals'",
      xp: 500,
      time: "2 hours ago",
      icon: "🎓"
    },
    {
      title: "Perfect Quiz Score",
      description: "Scored 100% on JavaScript Quiz",
      xp: 200,
      time: "1 day ago",
      icon: "🎯"
    },
    {
      title: "Streak Milestone",
      description: "7 days learning streak",
      xp: 150,
      time: "2 days ago",
      icon: "🔥"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Weekend Warrior",
      description: "Complete 2 courses this weekend",
      reward: "500 XP + Special Badge",
      progress: 1,
      total: 2,
      timeLeft: "2 days",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Quiz Champion",
      description: "Score above 90% on 3 quizzes",
      reward: "300 XP",
      progress: 2,
      total: 3,
      timeLeft: "5 days",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "Knowledge Explorer",
      description: "Try courses from 3 different categories",
      reward: "1000 XP + Rare Badge",
      progress: 1,
      total: 3,
      timeLeft: "1 week",
      difficulty: "Hard"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Learning Journey
          </h1>
          <p className="text-lg text-gray-600">
            Track your progress, earn badges, and compete with other learners
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-8 w-8" />
              <span className="text-2xl font-bold">Lv.{userStats.level}</span>
            </div>
            <div className="mb-2">
              <div className="text-sm opacity-90">XP Progress</div>
              <div className="text-lg font-semibold">{userStats.xp.toLocaleString()} / {userStats.xpToNext.toLocaleString()}</div>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(userStats.xp / userStats.xpToNext) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{userStats.totalPoints.toLocaleString()}</span>
            </div>
            <div className="text-gray-600">Total Points</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{userStats.streak}</span>
            </div>
            <div className="text-gray-600">Day Streak 🔥</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">#{userStats.rank}</span>
            </div>
            <div className="text-gray-600">Global Rank</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: Star },
                { id: 'badges', label: 'Badges', icon: Award },
                { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                { id: 'challenges', label: 'Challenges', icon: Target }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Recent Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                        <div className="text-3xl mr-4">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{achievement.title}</div>
                          <div className="text-gray-600">{achievement.description}</div>
                          <div className="text-sm text-gray-500">{achievement.time}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">+{achievement.xp} XP</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Chart Placeholder */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
                  <div className="bg-gray-100 rounded-xl p-8 text-center">
                    <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Progress chart would go here</p>
                  </div>
                </div>
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Badge Collection</h3>
                  <div className="text-sm text-gray-600">
                    {badges.filter(b => b.earned).length} of {badges.length} earned
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`border-2 rounded-2xl p-6 transition-all ${
                        badge.earned 
                          ? `${getRarityColor(badge.rarity)} shadow-lg` 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-4">{badge.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-2">{badge.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                        
                        {badge.earned ? (
                          <div className="text-xs text-green-600 font-medium">
                            Earned {new Date(badge.earnedDate!).toLocaleDateString()}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-xs text-gray-500">
                              Progress: {badge.progress}%
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${badge.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                          badge.rarity === 'common' ? 'bg-gray-200 text-gray-700' :
                          badge.rarity === 'rare' ? 'bg-blue-200 text-blue-700' :
                          badge.rarity === 'epic' ? 'bg-purple-200 text-purple-700' :
                          'bg-yellow-200 text-yellow-700'
                        }`}>
                          {badge.rarity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Global Leaderboard</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {userStats.totalUsers.toLocaleString()} learners
                  </div>
                </div>
                
                <div className="space-y-4">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center p-4 rounded-xl transition-all ${
                        user.isCurrentUser 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-white border border-gray-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 mr-4">
                        {user.rank <= 3 ? (
                          <div className={`text-2xl ${
                            user.rank === 1 ? 'text-yellow-500' :
                            user.rank === 2 ? 'text-gray-400' :
                            'text-orange-600'
                          }`}>
                            {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                          </div>
                        ) : (
                          <div className="text-lg font-bold text-gray-600">#{user.rank}</div>
                        )}
                      </div>
                      
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      
                      <div className="flex-1">
                        <div className={`font-semibold ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">{user.xp.toLocaleString()} XP</div>
                      </div>
                      
                      {user.isCurrentUser && (
                        <div className="text-blue-600 font-medium">You</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Active Challenges</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    View All
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                          <p className="text-gray-600 text-sm">{challenge.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{challenge.progress}/{challenge.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Reward</div>
                          <div className="font-medium text-green-600">{challenge.reward}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Time Left</div>
                          <div className="font-medium text-orange-600">{challenge.timeLeft}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationUI;