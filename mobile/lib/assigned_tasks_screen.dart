import 'package:flutter/material.dart';
import 'custom_app_bar.dart';  // Ensure this import points to the file where CustomAppBar is defined

class AssignedTasksScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Daily Status Updates',
        hasNotifications: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Assigned Tasks',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.orange),
            ),
            SizedBox(height: 20),
            _buildTaskCard(
              context,
              title: 'Task 1:',
              description: 'Conduct home visit for Case ID 102 - Victim Survivor',
              deadline: 'June 12, 2024, 10:00 AM',
              priority: 'High',
            ),
            SizedBox(height: 16),
            _buildTaskCard(
              context,
              title: 'Task 2:',
              description: 'Complete intake form for new referral - Person Who Used Drugs',
              deadline: 'June 12, 2024, 2:00 PM',
              priority: 'Medium',
            ),
            SizedBox(height: 16),
            _buildTaskCard(
              context,
              title: 'Task 3:',
              description: 'Prepare and submit monthly report for Children in Conflict with the Law cases',
              deadline: 'June 15, 2024, 5:00 PM',
              priority: 'Low',
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1, // Set the current index to the home/dashboard
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        onTap: (index) {
          if (index == 0) {
            Navigator.pushNamed(context, '/settings'); // Ensure this route exists
          } else if (index == 1) {
            Navigator.pushNamed(context, '/dashboard');
          } else if (index == 2) {
            Navigator.pushNamed(context, '/profile');
          }
        },
      ),
    );
  }

  Widget _buildTaskCard(BuildContext context, {
    required String title,
    required String description,
    required String deadline,
    required String priority,
  }) {
    return Container(
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Color.fromARGB(255, 212, 208, 208),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Text(
            'Description: $description',
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 4),
          Text(
            'Deadline: $deadline',
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(height: 4),
          Text(
            'Priority: $priority',
            style: TextStyle(fontSize: 16),
          ),
        ],
      ),
    );
  }
}
