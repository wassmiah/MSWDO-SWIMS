import 'package:flutter/material.dart';
import 'case_list_screen.dart';
import 'welcome_screen.dart';
import 'login_screen.dart';
import 'registration_screen.dart';
import 'forgot_password_screen.dart';
import 'dashboard_screen.dart';
import 'scheduled_activities_screen.dart';
import 'add_schedule_screen.dart';
import 'sos_screen.dart';
import 'profile_screen.dart';
import 'daily_status_updates_screen.dart';
import 'assigned_tasks_screen.dart';
import 'case_updates_screen.dart';
import 'approved_cases_screen.dart';
import 'pending_approvals_screen.dart';
import 'settings_screen.dart';
import 'case_categories_screen.dart';
import 'add_case_screen.dart'; // Ensure this import

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Map<String, String> _profileData = {
    'firstName': 'Jane',
    'lastName': 'Doe',
    'email': 'jane.doe@example.com',
    'phone': '+1234567890',
    'address': '123 Main St',
    'zipCode': '12345',
    'city': 'Anytown',
    'state': 'AnyState',
    'country': 'Countryland',
  };

  List<Map<String, dynamic>> _tasks = [
    {
      'color': Colors.blue,
      'case': 'Case 1',
      'description': 'Victim Survivors',
      'time': '08:00 - 13:00',
    },
    {
      'color': Colors.yellow,
      'case': 'Case 2',
      'description': 'Children in conflict with the law',
      'time': '14:00 - 16:30',
    },
  ];

  void _updateProfile(Map<String, String> profileData) {
    setState(() {
      _profileData = profileData;
    });
  }

  void _addTask(Map<String, dynamic> task) {
    setState(() {
      _tasks.add(task);
    });
  }

  void _addCase(Map<String, dynamic> newCase) {
    setState(() {
      _tasks.add(newCase);
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MSWDO-SWIMS',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => WelcomeScreen(),
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegistrationScreen(),
        '/forgot-password': (context) => ForgotPasswordScreen(),
        '/dashboard': (context) => DashboardScreen(tasks: _tasks),
        '/scheduled-activities': (context) => ScheduledActivitiesScreen(tasks: _tasks),
        '/add-schedule': (context) => AddScheduleScreen(onAddTask: _addTask),
        '/sos-button': (context) => SOSButtonScreen(),
        '/profile': (context) => ProfileScreen(profileData: _profileData, onSave: _updateProfile),
        '/daily-status-updates': (context) => DailyStatusUpdatesScreen(),
        '/assigned-tasks': (context) => AssignedTasksScreen(),
        '/case-updates': (context) => CaseUpdatesScreen(),
        '/approved-cases': (context) => ApprovedCasesScreen(),
        '/pending-approvals': (context) => PendingApprovalsScreen(),
        '/settings': (context) => SettingsScreen(),
        '/case-categories': (context) => CaseCategoriesScreen(onAddCase: _addCase), // Provide onAddCase callback
        '/case-list': (context) => CaseListScreen(category: '', onAddCase: _addCase), // Provide onAddCase callback
        '/add-case': (context) => AddCaseScreen(onSave: _addCase), // Add this route
      },
    );
  }
}
