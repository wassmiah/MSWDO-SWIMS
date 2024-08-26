import 'package:flutter/material.dart';
import 'login_screen.dart'; // Ensure this import exists for navigation

class SettingsScreen extends StatelessWidget {
  void _logout(BuildContext context) {
    // Clear user session data here, if any

    // Navigate back to the login screen and clear the navigation stack
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => LoginScreen()),
      (Route<dynamic> route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Settings'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ListTile(
                    title: Text('Account Settings'),
                  ),
                  Divider(),
                  ListTile(
                    title: Text('Change password'),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      // Handle change password
                    },
                  ),
                  Divider(),
                  ListTile(
                    title: Text('Other'),
                  ),
                  Divider(),
                  ListTile(
                    title: Text('About us'),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      // Handle about us
                    },
                  ),
                  Divider(),
                  ListTile(
                    title: Text('Privacy policy'),
                    trailing: Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      // Handle privacy policy
                    },
                  ),
                  Divider(),
                  ListTile(
                    title: Text(
                      'Log Out',
                      style: TextStyle(color: Colors.orange),
                    ),
                    leading: Icon(Icons.logout, color: Colors.orange),
                    onTap: () => _logout(context),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 0, // Set the current index to the settings
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
            Navigator.pushNamed(context, '/settings');
          } else if (index == 1) {
            Navigator.pushNamed(context, '/dashboard');
          } else if (index == 2) {
            Navigator.pushNamed(context, '/profile');
          }
        },
      ),
    );
  }
}

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool hasNotifications;
  final String title;

  CustomAppBar({required this.title, this.hasNotifications = true});

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      backgroundColor: Colors.white,
      iconTheme: IconThemeData(color: Colors.black),
      elevation: 0,
      actions: [
        Stack(
          children: [
            IconButton(
              icon: Icon(Icons.notifications),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => NotificationsScreen(),
                  ),
                );
              },
            ),
            if (hasNotifications)
              Positioned(
                right: 11,
                top: 11,
                child: Container(
                  padding: EdgeInsets.all(2),
                  decoration: BoxDecoration(
                    color: Colors.red,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  constraints: BoxConstraints(
                    minWidth: 12,
                    minHeight: 12,
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}

class NotificationsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(title: 'Notifications (3)', hasNotifications: true),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            NotificationItem(
              timeAgo: '35m ago',
              message: 'New Announcement from Admin.',
              isNew: true,
            ),
            NotificationItem(
              timeAgo: '2h ago',
              message: 'Update: Follow-up counseling session.',
              isNew: true,
            ),
            NotificationItem(
              timeAgo: '2h ago',
              message: 'Update: Follow-up counseling session.',
              isNew: true,
            ),
            SizedBox(height: 20),
            Center(
              child: TextButton(
                onPressed: () {
                  // Handle view all notifications
                },
                child: Text(
                  'View all notifications',
                  style: TextStyle(color: Colors.red, fontSize: 16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class NotificationItem extends StatelessWidget {
  final String timeAgo;
  final String message;
  final bool isNew;

  NotificationItem({
    required this.timeAgo,
    required this.message,
    required this.isNew,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 8),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 1,
            blurRadius: 5,
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(Icons.circle, color: Colors.red, size: 10),
          SizedBox(width: 10),
          Expanded(
            child: RichText(
              text: TextSpan(
                children: [
                  TextSpan(
                    text: '$timeAgo ',
                    style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
                  ),
                  TextSpan(
                    text: message,
                    style: TextStyle(color: Colors.black),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
